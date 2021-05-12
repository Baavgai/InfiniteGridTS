export interface CellRenderProps<TRow = any> { 
  row: TRow | undefined;
  rowIndex: number;
  colIndex: number;
  field: keyof TRow;
  colWidth: number;
  name: string;
  style: React.CSSProperties;
}

export interface TableColumn<TRow = any> {
  field: keyof TRow;
  colWidth?: number;
  name?: string;
  cellRender?: (props: CellRenderProps<TRow>) => JSX.Element;
  // headerRender?: (props: { colNum: number, field: keyof TRow, colWidth: number, name: string }) => JSX.Element;
}

export interface MyTableProps<TRow = any> {
  columns: TableColumn<TRow>[];
  totalRows: number;
  viewHeight: number;
  rowHeight: number;
  loadRows: (startIndex: number, stopIndex: number) => Promise<any>;
  getRow: (index: number) => TRow | undefined;
  // cellRender?: (props: { row: TRow, index: number colNum: number, field: keyof TRow, colWidth: number, name: string }) => JSX.Element;
  // headerRender?: (colNum: number, field: keyof TRow, colWidth: number, name: string) => JSX.Element;
}
