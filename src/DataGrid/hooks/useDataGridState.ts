// import { Ref } from "react";
import { DataGridProps, DataGridColumnDef, DataGridState, CellRenderProps } from "../types";
import { useBottomless } from "../hooks/useBottomless";
import { CellRender } from "../components/CellRenderer";
// export type { OnItemsRendered };



// MyTableProps
export const useDataGridState = <TRow = any>(p: DataGridProps<TRow>): DataGridState<TRow> => {
  const bs = useBottomless({
    isItemLoaded: i => p.getRow(i) !== undefined,
    loadMoreItems: p.loadRows,
    itemCount: p.totalRows
  });
  const columns: DataGridColumnDef<TRow>[] = [];
  let rowWidth = 0;
  p.columns.forEach(({ field, ...x }, colIndex) => {
    const colWidth = x.colWidth ?? 100;
    const colName = x.name ?? `${field}`;
    const style: React.CSSProperties = { position: "absolute", left: rowWidth, width: colWidth, height: p.rowHeight };
    const getProps = (rowIndex: number, row: TRow | undefined): CellRenderProps<TRow> => ({
      colName, colIndex, rowIndex, style, row,
      cellValue: row === undefined ? undefined : row[field]
    });
    columns.push({
      colIndex, colName, style,
      getProps,
      cellRender: x.cellRender ?? (p => CellRender(p))
    });
    rowWidth += colWidth;
  });
  const scrollBarWidth = (window && document) ? (window.innerWidth - document.documentElement.clientWidth) : 28;

  rowWidth += scrollBarWidth;

  return {
    getRow: p.getRow,
    totalRows: p.totalRows,
    gridHeight: p.gridHeight,
    rowHeight: p.rowHeight,
    ref: bs.ref,
    onItemsRendered: bs.onItemsRendered,
    columns, rowWidth
  };
};
