interface SharedProps<T> {
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

export interface DataGridColumnDef<TRow> extends CellRenderPropsBase {
  getProps: (rowIndex: number, row: TRow | undefined) => CellRenderProps<TRow>;
  cellRenderer: CellRenderer<TRow>;
}

export interface DataGridArrayColumn {
  name: string;
  index?: number;  // this will be taken from array position if not provided.
  colWidth?: number;
  cellRenderer?: CellRenderer<any[]>;
  // headerRender?: (props: { colNum: number, field: keyof TRow, colWidth: number, name: string }) => JSX.Element;
}



export interface DataGridArrayProps extends SharedProps<any[]> {
  columns: DataGridArrayColumn[];
}

export interface DataGridColumn<TRow = any> {
  field: keyof TRow;
  colWidth?: number;
  name?: string;
  cellRender?: (props: CellRenderProps<TRow>) => JSX.Element;
  // headerRender?: (props: { colNum: number, field: keyof TRow, colWidth: number, name: string }) => JSX.Element;
}


export interface DataGridProps<TRow = any> extends SharedProps<TRow> {
  columns: DataGridColumn<TRow>[];
}

export interface OnItemsRenderedProps {
  visibleStartIndex: number;
  visibleStopIndex: number;
}

export type OnItemsRendered = (props: OnItemsRenderedProps) => any;



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
