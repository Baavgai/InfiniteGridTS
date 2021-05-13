import React from "react";
// import { useBottomless } from "../../Bottomlesss/useBottomlessStandAlone";
import { useInfinityDataTester, Item } from "../useInfinityDataTester";
import { AppProps } from "../../types";
import { DataGrid, DataGridObjectProps } from "../../DataGrid"


export const ExampleComponent = (ap: AppProps) => {
  const p = useInfinityDataTester(ap.loadDelay);
  // const bs = useBottomless({ itemCount: 1000, isItemLoaded: p.isItemLoaded, loadMoreItems: p.loadMoreItems });
  const mp: DataGridObjectProps<Item> = {
    columns: [
      { field: "id", colWidth: 75 },
      { field: "firstName", colWidth: 200 },
      { field: "lastName", colWidth: 200 },
      { field: "age", colWidth: 50 },
      { field: "lastName", colWidth: 200, name: "col1" },
      { field: "lastName", colWidth: 200, name: "col2" },
      { field: "lastName", colWidth: 200, name: "col3" },
      { field: "lastName", colWidth: 200, name: "col4" },
      { field: "lastName", colWidth: 200, name: "col5" },
      { field: "lastName", colWidth: 200, name: "col6" },
      { field: "lastName", colWidth: 200, name: "col7" },
    
    ],
    totalRows: 1000,
    gridHeight: ap.height,
    rowHeight: 35,
    loadRows: p.loadMoreItems,
    getRow: p.getItemData
  };
  return <DataGrid {...mp} />;
};

export const ExampleName = "My data grid test";

