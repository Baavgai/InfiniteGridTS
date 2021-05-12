import { Ref } from "react";
import { MyTableProps, CellRenderProps } from "./types";
import { useBottomless, OnItemsRendered } from "./useBottomless";
import { CellRender } from "./CellRenderer";
// export type { OnItemsRendered };

export interface ColumnDef<TRow> {
  field: keyof TRow;
  colIndex: number;
  colWidth: number;
  name: string;
  style: React.CSSProperties;
  cellRender: (props: CellRenderProps<TRow>) => JSX.Element;
}

export interface MyTableState<TRow = any> extends Omit<MyTableProps<TRow>, "columns"> {
  columns: ColumnDef<TRow>[];
  rowWidth: number;
  onItemsRendered: OnItemsRendered
  ref?: Ref<any>;
}


// MyTableProps
export const useMyTableState = <TRow = any>(p: MyTableProps<TRow>): MyTableState<TRow> => {
  const bs = useBottomless({
    isItemLoaded: i => p.getRow(i) !== undefined,
    loadMoreItems: p.loadRows,
    itemCount: p.totalRows
  });
  const columns: ColumnDef<TRow>[] = [];
  let rowWidth = 0;
  p.columns.forEach(({ field, ...x }, colIndex) => {
    const colWidth = x.colWidth ?? 100;
    const name = x.name ?? `${field}`;
    const style: React.CSSProperties = { position: "absolute", left: rowWidth, width: colWidth, height: p.rowHeight };
    columns.push({
      field, colWidth, name, style, colIndex,
      cellRender: x.cellRender ?? (p => CellRender(p))
    });
    rowWidth += colWidth;
  });
  const scrollBarWidth = (window && document) ? (window.innerWidth - document.documentElement.clientWidth) : 28;

  rowWidth += scrollBarWidth;

  return {
    totalRows: p.totalRows,
    viewHeight: p.viewHeight,
    rowHeight: p.rowHeight,
    loadRows: p.loadRows,
    getRow: p.getRow,
    ref: bs.ref,
    onItemsRendered: bs.onItemsRendered,
    columns, rowWidth
  };
};
