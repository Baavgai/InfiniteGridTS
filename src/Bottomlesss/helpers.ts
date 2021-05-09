export interface RangeVisProps {
  lastRenderedStartIndex: number;
  lastRenderedStopIndex: number;
  startIndex: number;
  stopIndex: number;
}

export const isRangeVisible = ({ lastRenderedStartIndex, lastRenderedStopIndex, startIndex, stopIndex, }: RangeVisProps): boolean =>
  !(startIndex > lastRenderedStopIndex || stopIndex < lastRenderedStartIndex);


export const isNum = (n: any): n is number =>
  !isNaN(parseFloat(n));

export const isFloat = (n: any): n is number =>
  isNum(n) && n % 1 !== 0;

export const isInt = (n: any): n is number =>
  isNum(n) && n % 1 === 0;

/*
export const isInteger = (value: number): boolean => {
    typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
*/