// @flow

import { PureComponent } from 'react';

import { isInt, isRangeVisible } from './helpers';
import { scanForUnloadedRanges } from './scanForUnloadedRanges';

import { Ranges, BottomlessComponentProps, BottomlessDefaults, OnItemsRendered } from './types';

// type onItemsRenderedParams = { visibleStartIndex: number, visibleStopIndex: number };type onItemsRendered = (params: onItemsRenderedParams) => void;

export class InfiniteLoader extends PureComponent<BottomlessComponentProps> {
  _lastRenderedStartIndex: number = -1;
  _lastRenderedStopIndex: number = -1;
  _listRef: any;
  _memoizedUnloadedRanges: Ranges = [];

  resetloadMoreItemsCache(autoReload: boolean = false) {
    this._memoizedUnloadedRanges = [];

    if (autoReload) {
      this._ensureRowsLoaded(
        this._lastRenderedStartIndex,
        this._lastRenderedStopIndex
      );
    }
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      if (this._listRef == null) {
        console.warn(
          'Invalid list ref; please refer to InfiniteLoader documentation.'
        );
      }
    }
  }

  render() {
    const { children } = this.props;

    return children({
      onItemsRendered: this._onItemsRendered,
      ref: this._setRef,
    });
  }

  _onItemsRendered: OnItemsRendered = ({ visibleStartIndex, visibleStopIndex}) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!isInt(visibleStartIndex) || !isInt(visibleStopIndex)) {
        console.warn(
          'Invalid onItemsRendered signature; please refer to InfiniteLoader documentation.'
        );
      }
    }

    this._lastRenderedStartIndex = visibleStartIndex;
    this._lastRenderedStopIndex = visibleStopIndex;

    this._ensureRowsLoaded(visibleStartIndex, visibleStopIndex);
  };

  _setRef = (listRef: any) => { this._listRef = listRef; };

  _ensureRowsLoaded(startIndex: number, stopIndex: number) {
    const threshold = this.props.threshold ?? BottomlessDefaults.threshold;
    const unloadedRanges = scanForUnloadedRanges({
      ...this.props,
      startIndex: Math.max(0, startIndex - threshold),
      stopIndex: Math.min(this.props.itemCount - 1, stopIndex + threshold),
    });

    // Avoid calling load-rows unless range has changed.
    // This shouldn't be strictly necessary, but is maybe nice to do.
    if (
      this._memoizedUnloadedRanges.length !== unloadedRanges.length ||
      this._memoizedUnloadedRanges.some(
        (startOrStop, index) => unloadedRanges[index] !== startOrStop
      )
    ) {
      this._memoizedUnloadedRanges = unloadedRanges;
      this._loadUnloadedRanges(unloadedRanges);
    }
  }

  _loadUnloadedRanges(unloadedRanges: Ranges) {
    // loadMoreRows was renamed to loadMoreItems in v1.0.3; will be removed in v2.0
    const loadMoreItems = this.props.loadMoreItems;

    for (let i = 0; i < unloadedRanges.length; i++) {
      const [startIndex, stopIndex] = unloadedRanges[i];
      loadMoreItems(startIndex, stopIndex).then(() => {
        // Refresh the visible rows if any of them have just been loaded.
        // Otherwise they will remain in their unloaded visual state.
        if (
          isRangeVisible({
            lastRenderedStartIndex: this._lastRenderedStartIndex,
            lastRenderedStopIndex: this._lastRenderedStopIndex,
            startIndex,
            stopIndex,
          })
        ) {
          // Handle an unmount while promises are still in flight.
          if (this._listRef == null) {
            return;
          }

          // Resize cached row sizes for VariableSizeList,
          // otherwise just re-render the list.
          if (typeof this._listRef.resetAfterIndex === 'function') {
            this._listRef.resetAfterIndex(startIndex, true);
          } else {
            // HACK reset temporarily cached item styles to force PureComponent to re-render.
            // This is pretty gross, but I'm okay with it for now.
            // Don't judge me.
            if (typeof this._listRef._getItemStyleCache === 'function') {
              this._listRef._getItemStyleCache(-1);
            }
            this._listRef.forceUpdate();
          }
        }
      });
    }
  }
}
