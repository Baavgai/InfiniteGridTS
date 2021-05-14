import React from "react";
// import { useBottomless } from "../../Bottomlesss/useBottomlessStandAlone";
import { useInfinityTester } from "../useInfinityTester";
import { AppProps } from "../../types";
import { DataGridView, DataGridArrayProps, calcDataGridArrayState } from "../../DataGrid";
import { range } from "../../functions";


export const ExampleComponent = (ap: AppProps) => {
  const p = useInfinityTester(ap.loadDelay);
  // const bs = useBottomless({ itemCount: 1000, isItemLoaded: p.isItemLoaded, loadMoreItems: p.loadMoreItems });
  const mp: DataGridArrayProps = {
    columns: [
      { name: "id", colWidth: 75 },
      { name: "firstName", colWidth: 200 },
      { name: "lastName", colWidth: 200 },
      { name: "age", colWidth: 50 },
      { name: "lastName", colWidth: 200 },
    ],
    totalRows: 1000,
    viewHeight: ap.height,
    rowHeight: 35,
    loadRows: p.loadMoreItems,
    getRow: x => range(9).map(i =>i * 10000 + x)
  };
  const vp = calcDataGridArrayState(mp);
  return <DataGridView {...vp} />;
};

export const ExampleName = "ExMyDataGridWin";

