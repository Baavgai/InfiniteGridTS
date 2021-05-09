import { useState, useRef } from 'react';
import { Ranges, BottomlessProps, BottomlessDefaults, OnItemsRendered, BottomlessState, BottomlessRefType } from './types';
import { isRangeVisible } from './helpers';
import { scanForUnloadedRanges } from './scanForUnloadedRanges';

interface State {
  lastRenderedStartIndex: number;
  lastRenderedStopIndex: number;
  memoizedUnloadedRanges: Ranges;
}

type RefType = BottomlessRefType | undefined;


const loadUnloadedRanges = (p: BottomlessProps, ref: RefType, state: Omit<State, "memoizedUnloadedRanges">, unloadedRanges: Ranges): void => {
  for (let i = 0; i < unloadedRanges.length; i++) {
    const [startIndex, stopIndex] = unloadedRanges[i];
    p.loadMoreItems(startIndex, stopIndex).then(() => {
      // Refresh the visible rows if any of them have just been loaded.
      // Otherwise they will remain in their unloaded visual state.
      if (
        isRangeVisible({
          lastRenderedStartIndex: state.lastRenderedStartIndex,
          lastRenderedStopIndex: state.lastRenderedStopIndex,
          startIndex,
          stopIndex,
        })
      ) {
        // Handle an unmount while promises are still in flight.
        if (ref!==undefined && ref.current) {
          const liveRef = ref.current;
          if (liveRef.resetAfterIndex !== undefined) {
            liveRef.resetAfterIndex(startIndex, true);
          } else {
            // HACK reset temporarily cached item styles to force PureComponent to re-render.
            // This is pretty gross, but I'm okay with it for now.
            // Don't judge me.
            if (liveRef.getItemStyleCache) {
              liveRef.getItemStyleCache(-1);
            }
            if (liveRef.forceUpdate) {
              liveRef.forceUpdate();
            }
          }
        }
      }
    });
  }
};


const ensureRowsLoaded = (p: BottomlessProps, ref: RefType, state: State): State => {
  const startIndex = state.lastRenderedStartIndex;
  const stopIndex = state.lastRenderedStopIndex;

  const threshold = p.threshold ?? BottomlessDefaults.threshold;
  const unloadedRanges = scanForUnloadedRanges({
    ...p,
    startIndex: Math.max(0, startIndex - threshold),
    stopIndex: Math.min(p.itemCount - 1, stopIndex + threshold),
  });

  // Avoid calling load-rows unless range has changed.
  // This shouldn't be strictly necessary, but is maybe nice to do.
  if (
    state.memoizedUnloadedRanges.length !== unloadedRanges.length ||
    state.memoizedUnloadedRanges.some((startOrStop, index) => unloadedRanges[index] !== startOrStop)
  ) {

    loadUnloadedRanges(p, ref, state, unloadedRanges);
    return { ...state, memoizedUnloadedRanges: unloadedRanges };
  } else {
    return state;
  }

}

export const useBottomless = (p: BottomlessProps): BottomlessState => {
  const refContainer = useRef<BottomlessRefType>();
  const setState = useState<State>({
    lastRenderedStartIndex: -1,
    lastRenderedStopIndex: -1,
    memoizedUnloadedRanges: []
  })[1];

  const onItemsRendered: OnItemsRendered = ({ visibleStartIndex, visibleStopIndex }) =>
    setState(s => ensureRowsLoaded(p, refContainer.current, {
      ...s,
      lastRenderedStartIndex: visibleStartIndex,
      lastRenderedStopIndex: visibleStopIndex
    }));
  return {
    onItemsRendered,
    ref: refContainer.current
  }
};
