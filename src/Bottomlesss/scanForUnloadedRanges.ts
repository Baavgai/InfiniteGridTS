import { Ranges, BottomlessProps, BottomlessDefaults } from './types';

interface Props extends Pick<BottomlessProps, "isItemLoaded" | "itemCount" | "minimumBatchSize"> {
  startIndex: number;
  stopIndex: number;
}

export const scanForUnloadedRanges = (p: Props): Ranges => {
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
