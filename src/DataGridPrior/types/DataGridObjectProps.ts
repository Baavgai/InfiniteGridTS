import { CellRenderer, SharedProps } from "./shared";

export interface DataGridObjectColumn<TRow = any> {
  field: keyof TRow;
  colWidth?: number;
  name?: string;
  cellRenderer?: CellRenderer<TRow>;
  // headerRender?: (props: { colNum: number, field: keyof TRow, colWidth: number, name: string }) => JSX.Element;
}

export interface DataGridObjectProps<TRow = any> extends SharedProps<TRow> {
  columns: DataGridObjectColumn<TRow>[];
}
