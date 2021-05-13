import { DataGridArrayProps } from "./DataGridArrayProps";
import { DataGridObjectProps } from "./DataGridObjectProps";
import { CellRenderer, CellRenderPropsBase, CellRenderProps } from "./shared";

export * from "./DataGridArrayProps";
export * from "./DataGridObjectProps";
export * from "./shared";

export type DataGridProps =
  | DataGridArrayProps
  | DataGridObjectProps;

export interface OnItemsRenderedProps {
  visibleStartIndex: number;
  visibleStopIndex: number;
}

export type OnItemsRendered = (props: OnItemsRenderedProps) => any;

export interface DataGridColumnDef<TRow> extends CellRenderPropsBase {
  getProps: (rowIndex: number, row: TRow | undefined) => CellRenderProps<TRow>;
  cellRenderer: CellRenderer<TRow>;
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
