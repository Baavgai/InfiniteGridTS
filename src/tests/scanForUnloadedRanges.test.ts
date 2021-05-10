import { scanForUnloadedRanges } from "../Bottomlesss/scanForUnloadedRanges"


const test = () => {
  function createIsItemLoaded(rows: any[]) {
    return (index: number) => rows[index];
  }
  describe('scanForUnloadedRanges', () => {

    it('should return an empty array for a range of rows that have all been loaded', () => {
      expect(
        scanForUnloadedRanges({
          isItemLoaded: createIsItemLoaded([true, true, true]),
          startIndex: 0,
          stopIndex: 2,
        })
      ).toEqual([]);
    });

    it('return a range of only 1 unloaded row', () => {
      expect(
        scanForUnloadedRanges({
          isItemLoaded: createIsItemLoaded([true, false, true]),
          startIndex: 0,
          stopIndex: 2,
        })
      ).toEqual([[1, 1]]);
    });

    it('return a range of multiple unloaded rows', () => {
      expect(
        scanForUnloadedRanges({
          isItemLoaded: createIsItemLoaded([false, false, true]),
          startIndex: 0,
          stopIndex: 2,
        })
      ).toEqual([[0, 1]]);
    });

    it('return multiple ranges of unloaded rows with min 20', () => {
      expect(
        scanForUnloadedRanges({
          isItemLoaded: createIsItemLoaded([
            true,
            false,
            false,
            true,
            false,
            true,
            false,
          ]),
          startIndex: 0,
          stopIndex: 6,
          minimumBatchSize: 20
        })
      ).toEqual([[1, 2], [4, 4], [6, 20]]);
    });

    it('return multiple ranges of unloaded rows', () => {
      expect(
        scanForUnloadedRanges({
          isItemLoaded: createIsItemLoaded([
            true,
            false,
            false,
            true,
            false,
            true,
            false,
          ]),
          startIndex: 0,
          stopIndex: 6,
          minimumBatchSize: 6
        })
      ).toEqual([[1, 2], [4, 4], [6, 6]]);
    });

  });
}

test();
