import { useState, useRef, Ref, RefObject } from 'react';

export interface BottomlessProps {
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<any>;
  itemCount: number;
  minimumBatchSize?: number;
  threshold?: number;
}

interface HookState {
  lastRenderedStartIndex: number;
  lastRenderedStopIndex: number;
  memoizedUnloadedRanges: Ranges;
}

type RefType = BottomlessRefType | undefined;

interface BottomlessRefProps {
  resetAfterIndex?: (index: number, shouldForceUpdate?: boolean) => void;
  getItemStyleCache?: (index: number) => void;
  forceUpdate?: () => void;
}

type BottomlessRefType = RefObject<BottomlessRefProps>;

type Ranges = [number, number][];

interface OnItemsRenderedProps {
  visibleStartIndex: number;
  visibleStopIndex: number;
}

export type OnItemsRendered = (props: OnItemsRenderedProps) => any;

export interface BottomlessState {
  onItemsRendered: OnItemsRendered;
  ref?: Ref<any>;
  itemCount: number;
  minimumBatchSize?: number;
  threshold?: number;
}


const BottomlessDefaults = { minimumBatchSize: 10, threshold: 15, itemCount: 1000 };

const loadUnloadedRanges = (p: BottomlessProps, ref: RefType, state: Omit<HookState, "memoizedUnloadedRanges">, unloadedRanges: Ranges): void => {
  for (let i = 0; i < unloadedRanges.length; i++) {
    const [startIndex, stopIndex] = unloadedRanges[i];
    p.loadMoreItems(startIndex, stopIndex).then(() => {
      // Refresh the visible rows if any of them have just been loaded.
      // Otherwise they will remain in their unloaded visual state.
      if (!(startIndex > state.lastRenderedStopIndex || stopIndex < state.lastRenderedStartIndex)) {
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

interface ScanForUnloadedRangesProps extends Pick<BottomlessProps, "isItemLoaded" | "minimumBatchSize"> {
  startIndex: number;
  stopIndex: number;
  itemCount?: number;
}

const scanForUnloadedRanges = (p: ScanForUnloadedRangesProps): Ranges => {
  const { isItemLoaded, itemCount, minimumBatchSize, startIndex, stopIndex } = {...BottomlessDefaults, ...p};
  const unloadedRanges: Ranges = [];

  let rangeStartIndex: number | undefined;
  let rangeStopIndex: number | undefined;

  for (let index = startIndex; index <= stopIndex; index++) {
    if (!isItemLoaded(index)) {
      rangeStopIndex = index;
      if (rangeStartIndex === undefined) {
        rangeStartIndex = index;
      }
    } else if (rangeStopIndex !== undefined) {
      unloadedRanges.push([rangeStartIndex!, rangeStopIndex]);

      rangeStartIndex = rangeStopIndex = undefined;
    }
  }

  // If :rangeStopIndex is not null it means we haven't ran out of unloaded rows.
  // Scan forward to try filling our :minimumBatchSize.
  if (rangeStopIndex !== undefined) {
    const potentialStopIndex = Math.min(
      Math.max(rangeStopIndex, rangeStartIndex! + minimumBatchSize - 1),
      itemCount - 1
    );

    for (let index = rangeStopIndex + 1; index <= potentialStopIndex; index++) {
      if (!isItemLoaded(index)) {
        rangeStopIndex = index;
      } else {
        break;
      }
    }
    unloadedRanges.push([rangeStartIndex!, rangeStopIndex]);
  }

  // Check to see if our first range ended prematurely.
  // In this case we should scan backwards to try filling our :minimumBatchSize.
  if (unloadedRanges.length) {
    while (unloadedRanges[0][1] - unloadedRanges[0][0] + 1 < minimumBatchSize &&  unloadedRanges[0][0] > 0) {
      const index = unloadedRanges[0][0] - 1;
      if (!isItemLoaded(index)) {
        unloadedRanges[0][0] = index;
      } else {
        break;
      }
    }
  }
  return unloadedRanges;
}



const ensureRowsLoaded = (p: BottomlessProps, ref: RefType, state: HookState): HookState => {
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
  const setState = useState<HookState>({
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
    ref: refContainer.current,
    itemCount: p.itemCount,
    minimumBatchSize: p.minimumBatchSize,
    threshold: p.threshold
  };
};
