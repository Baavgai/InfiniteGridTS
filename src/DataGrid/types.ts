export interface DataGridProps<TRow = any> {
  columns: DataGridColumn<TRow>[];
  totalRows: number;
  gridHeight: number;
  rowHeight: number;
  loadRows: (startIndex: number, stopIndex: number) => Promise<any>;
  getRow: (rowIndex: number) => TRow | undefined;
  // cellRender?: (props: { row: TRow, index: number colNum: number, field: keyof TRow, colWidth: number, name: string }) => JSX.Element;
  // headerRender?: (colNum: number, field: keyof TRow, colWidth: number, name: string) => JSX.Element;
}

export interface OnItemsRenderedProps {
  visibleStartIndex: number;
  visibleStopIndex: number;
}

export type OnItemsRendered = (props: OnItemsRenderedProps) => any;


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

export interface DataGridColumn<TRow = any> {
  field: keyof TRow;
  colWidth?: number;
  name?: string;
  cellRender?: (props: CellRenderProps<TRow>) => JSX.Element;
  // headerRender?: (props: { colNum: number, field: keyof TRow, colWidth: number, name: string }) => JSX.Element;
}

export interface DataGridColumnDef<TRow> extends CellRenderPropsBase {
  getProps: (rowIndex: number, row: TRow | undefined) => CellRenderProps<TRow>;
  cellRender: (props: CellRenderProps<TRow>) => JSX.Element;
}

export interface DataGridState<TRow = any> {
  getRow: (rowIndex: number) => TRow | undefined;
  columns: DataGridColumnDef<TRow>[];
  totalRows: number;
  gridHeight: number;
  rowHeight: number;
  rowWidth: number;
  onItemsRendered: OnItemsRendered
  ref?: React.Ref<any>;
}
