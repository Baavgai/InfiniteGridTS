// import { Ref } from "react";
import {
  DataGridColumnDef, DataGridState, CellRenderProps,
  DataGridArrayProps, DataGridObjectProps, DataGridProps, DataGridObjectColumn
} from "../types";
import { useBottomless } from "../hooks/useBottomless";
import { CellRender } from "../components/CellRenderer";


const isDataGridObjectColumn = (x: any): x is DataGridObjectColumn =>
  x && "field" in x;

export const isDataGridObjectProps = (x: DataGridProps): x is DataGridObjectProps =>
  isDataGridObjectColumn(x.columns[0]);

export const useDataGridObjState = <TRow = any>(p: DataGridObjectProps<TRow>): DataGridState<TRow> => {
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
      cellRenderer: x.cellRenderer ?? (p => CellRender(p))
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

export const useDataGridArrayState = (p: DataGridArrayProps): DataGridState<any[]> => {
  const bs = useBottomless({
    isItemLoaded: i => p.getRow(i) !== undefined,
    loadMoreItems: p.loadRows,
    itemCount: p.totalRows
  });
  const columns: DataGridColumnDef<any[]>[] = [];
  let rowWidth = 0;
  p.columns.forEach((x, colIndex) => {
    const colWidth = x.colWidth ?? 100;
    // const colName = x.name;
    const style: React.CSSProperties = { position: "absolute", left: rowWidth, width: colWidth, height: p.rowHeight };
    const getProps = (rowIndex: number, row: any[] | undefined): CellRenderProps<any[]> => ({
      colName: x.name, colIndex, rowIndex, style, row,
      cellValue: row === undefined ? undefined : row[colIndex]
    });
    columns.push({
      colIndex, colName: x.name, style,
      getProps,
      cellRenderer: x.cellRenderer ?? (p => CellRender(p))
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
