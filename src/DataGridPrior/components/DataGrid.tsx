import React from "react";
import { useDataGridArrayState, useDataGridObjState, isDataGridObjectProps } from "../hooks/useDataGridState";
import { DataGridProps, DataGridArrayProps, DataGridObjectProps } from "../types";
import { DataGridView } from "./DataGridView";

const DataGridObj = (p: DataGridObjectProps) => {
    const s = useDataGridObjState(p);
    // console.log(s);
    return <DataGridView {...s} />;
};

const DataGridArr = (p: DataGridArrayProps) => {
  const s = useDataGridArrayState(p);
  // console.log(s);
  return <DataGridView {...s} />;
};


export const DataGrid = (p: DataGridProps) => 
  isDataGridObjectProps(p) ? DataGridObj(p) : DataGridArr(p);