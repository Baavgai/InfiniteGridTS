import { CellRenderer, SharedProps } from "./shared";

export interface DataGridArrayColumn {
  name: string;
  index?: number;  // this will be taken from array position if not provided.
  colWidth?: number;
  cellRenderer?: CellRenderer<any[]>;
}

export interface DataGridArrayProps extends SharedProps<any[]> {
  columns: DataGridArrayColumn[];
}
