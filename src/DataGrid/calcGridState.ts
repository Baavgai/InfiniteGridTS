import {
  DataGridColumnDef, DataGridState,
  DataGridArrayProps, DataGridObjectProps, DataGridProps, DataGridObjectColumn,
  DataGridArrayColumn, SharedProps, CellRenderer
} from "./types";
import { DefaultCellRenderer } from "./components/DefaultCellRenderer";
import { DefaultHeaderRenderer } from "./components/DefaultHeaderRenderer";


interface CalcColumnsResult<T> {
  columns: DataGridColumnDef<T>[];
  rowWidth: number;
}

const isDataGridObjectColumn = (x: any): x is DataGridObjectColumn =>
  x && "field" in x;

export const isDataGridObjectProps = (x: DataGridProps): x is DataGridObjectProps =>
  isDataGridObjectColumn(x.columns[0]);

const calcScrollBarWidth = () => (window && document) ? (window.innerWidth - document.documentElement.clientWidth) : 28;

const combineHeadBodyRender = <T>(head: CellRenderer<T>, body: CellRenderer<T>): CellRenderer<T> =>
  p => p.rowIndex === 0 ? head(p) : body({ ...p, rowIndex: p.rowIndex - 1 })


const calcStateShared = <T>(p: SharedProps<T>, cr: CalcColumnsResult<T>): DataGridState<T> => {
  return {
    getRow: p.getRow,
    loadRows: p.loadRows,
    totalRows: p.totalRows,
    viewWidth: p.viewWidth ?? cr.rowWidth,
    viewHeight: p.viewHeight,
    rowHeight: p.rowHeight,
    columns: cr.columns,
    rowWidth: cr.rowWidth
  };
};


const calcObjColumns = <TRow>(propColumns: DataGridObjectColumn<TRow>[], sp: SharedProps<TRow>): CalcColumnsResult<TRow> => {
  const columns: DataGridColumnDef<TRow>[] = [];
  let rowWidth = 0;
  propColumns.forEach(({ field, ...x }, colIndex) => {
    const colWidth = x.colWidth ?? 100;
    const colName = x.name ?? `${field}`;
    columns.push({
      colWidth,
      colName,
      cellRenderer: combineHeadBodyRender(DefaultHeaderRenderer, x.cellRenderer ?? (p => DefaultCellRenderer(p))),
      getValue: p => {
        const row = sp.getRow(p.rowIndex);
        const cellValue = row === undefined ? undefined : row[field];
        return { row, cellValue };
      }
    });
    rowWidth += colWidth;
  });
  return { columns, rowWidth: rowWidth + calcScrollBarWidth() };
};


const calcArrayColumns = (propColumns: DataGridArrayColumn[], sp: SharedProps<any[]>): CalcColumnsResult<any[]> => {
  const columns: DataGridColumnDef<any[]>[] = [];
  let rowWidth = 0;
  propColumns.forEach((x, colIndex) => {
    const colWidth = x.colWidth ?? 100;
    columns.push({
      colWidth,
      colName: x.name,
      cellRenderer: combineHeadBodyRender(DefaultHeaderRenderer, x.cellRenderer ?? (p => DefaultCellRenderer(p))),
      getValue: p => {
        const row = sp.getRow(p.rowIndex);
        const cellValue = row === undefined ? undefined : row[x.index ?? colIndex];
        return { row, cellValue };
      }
    });
    rowWidth += colWidth;
  });
  return { columns, rowWidth: rowWidth + calcScrollBarWidth() };
};


export const calcDataGridObjState = <TRow = any>(p: DataGridObjectProps<TRow>): DataGridState<TRow> =>
  calcStateShared(p, calcObjColumns(p.columns, p));

export const calcDataGridArrayState = (p: DataGridArrayProps): DataGridState<any[]> =>
  calcStateShared(p, calcArrayColumns(p.columns, p));

