import { DataGridArrayProps } from "./DataGridArrayProps";
import { DataGridObjectProps } from "./DataGridObjectProps";
import { CellRenderer, CellRenderProps } from "./shared";

export * from "./DataGridArrayProps";
export * from "./DataGridObjectProps";
export * from "./shared";

export type DataGridProps =
  | DataGridArrayProps
  | DataGridObjectProps;

export interface DataGridColumnDef<TRow> extends CellRenderProps<TRow> {
  cellRenderer: CellRenderer<TRow>;
}

export interface DataGridState<TRow = any[]> {
  getRow: (rowIndex: number) => TRow | undefined;
  loadRows: (startIndex: number, stopIndex: number) => Promise<any>;
  columns: DataGridColumnDef<TRow>[];
  totalRows: number;
  viewHeight: number;
  viewWidth: number;
  rowHeight: number;
  rowWidth: number;
 
}
