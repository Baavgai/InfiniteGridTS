import React from "react";
import { useDataGridState } from "../hooks/useDataGridState";
import { DataGridProps } from "../types";
import { DataGridView } from "./DataGridView";

export const DataGrid = (p: DataGridProps) => {
  const s = useDataGridState(p);
  // console.log(s);
  return <DataGridView {...s} />;
};
