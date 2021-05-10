import { scanForUnloadedRanges, ScanForUnloadedRangesProps } from "../Bottomlesss/scanForUnloadedRanges"

const createIsItemLoaded = (rows: boolean[]) =>
  (index: number) => rows[index];

const buildProps = (rows: boolean[]): ScanForUnloadedRangesProps =>
({
  isItemLoaded: createIsItemLoaded(rows),
  startIndex: 0,
  stopIndex: rows.length - 1,
  itemCount: rows.length - 1
});

const buildAllProps = (loaded: boolean, stopIndex: number): ScanForUnloadedRangesProps =>
({
  isItemLoaded: _ => loaded, startIndex: 0, stopIndex, itemCount: stopIndex + 1
});

describe('scanForUnloadedRanges', () => {

  it('should return an empty array for a range of rows that have all been loaded', () => {
    expect(scanForUnloadedRanges(buildAllProps(true, 10))).toEqual([]);
  });

  it('return a range of only 1 unloaded row', () => {
    expect(scanForUnloadedRanges(buildProps([true, false, true])))
      .toEqual([[1, 1]]);
  });

  it('return a range of multiple unloaded rows', () => {
    expect(scanForUnloadedRanges(buildProps([false, false, true])))
      .toEqual([[0, 1]]);
  });

  it('return full range', () => {
    const n = 3;
    expect(scanForUnloadedRanges(buildAllProps(false, n))).toEqual([[0, n]]);
  });

  it('return full range 10000', () => {
    const n = 10000;
    expect(scanForUnloadedRanges(buildAllProps(false, n))).toEqual([[0, n]]);
  });

  it('return multiple ranges of unloaded rows', () => {
    expect(scanForUnloadedRanges(buildProps([true, false, false, true, false, true, false])))
      .toEqual([[1, 2], [4, 4], [6, 6]]);
  });

});
