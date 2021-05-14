export interface SharedProps<T> {
  totalRows: number;
  gridHeight: number;
  rowHeight: number;
  loadRows: (startIndex: number, stopIndex: number) => Promise<any>;
  getRow: (rowIndex: number) => T | undefined;
}

export interface CellRenderPropsBase { 
  colIndex: number;
  colName: string;
  style: React.CSSProperties;
}

export interface CellRenderProps<TRow> extends CellRenderPropsBase {
  row: TRow | undefined;
  cellValue?: any;
  rowIndex: number;
}

export type CellRenderer<TRow> = (props: CellRenderProps<TRow>) => JSX.Element;

