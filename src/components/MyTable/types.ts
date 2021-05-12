export interface TableColumn<TRow = any> {
  field: keyof TRow;
  colWidth?: number;
  name?: string;
}

export interface MyTableProps<TRow = any> {
  columns: TableColumn<TRow>[];
  totalRows: number;
  viewHeight: number;
  rowHeight: number;
  loadRows: (startIndex: number, stopIndex: number) => Promise<any>;
  getRow: (index: number) => TRow | undefined;
  // cellRender: (row: TRow, index: number) => Jt
}
