import { Ref } from "react";
import { MyTableProps } from "./types";
import { useBottomless, OnItemsRendered } from "./useBottomless";
// export type { OnItemsRendered };

export interface ColumnDef<TRow> {
  field: keyof TRow;
  colWidth: number;
  name: string;
  style: React.CSSProperties;
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
  p.columns.forEach(x => {
    const colWidth = x.colWidth ?? 100;
    columns.push({
      field: x.field,
      colWidth,
      name: x.name ?? `${x.field}`,
      style: { position: "absolute", left: rowWidth, width: colWidth, height: p.rowHeight }
    });
    rowWidth += colWidth;
  });

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
