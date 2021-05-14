import { GridCellProps } from "react-virtualized";

export interface SharedProps<T> {
  totalRows: number;
  viewHeight: number;
  viewWidth?: number;
  rowHeight: number;
  loadRows: (startIndex: number, stopIndex: number) => Promise<any>;
  getRow: (rowIndex: number) => T | undefined;
}

export interface CellRenderProps<TRow> {
  colName: string;
  colWidth: number;
  getValue: (p: {columnIndex: number, rowIndex: number}) => {row: TRow | undefined; cellValue: any }
}

export type CellRenderer<TRow> = (props: GridCellProps & CellRenderProps<TRow>) => React.ReactNode;
