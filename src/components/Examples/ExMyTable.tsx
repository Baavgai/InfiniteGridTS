import React from "react";
// import { useBottomless } from "../../Bottomlesss/useBottomlessStandAlone";
import { useInfinityDataTester, Item } from "../useInfinityDataTester";
import { AppProps } from "../../types";
import { MyTable, MyTableProps } from "../MyTable";


export const ExampleComponent = (ap: AppProps) => {
  const p = useInfinityDataTester(ap.loadDelay);
  // const bs = useBottomless({ itemCount: 1000, isItemLoaded: p.isItemLoaded, loadMoreItems: p.loadMoreItems });
  const mp: MyTableProps<Item> = {
    columns: [
      { field: "id", colWidth: 75 },
      { field: "firstName", colWidth: 200 },
      { field: "lastName", colWidth: 200 },
      { field: "age", colWidth: 50 }
    ],
    totalRows: 1000,
    viewHeight: ap.height,
    rowHeight: 35,
    loadRows: p.loadMoreItems,
    getRow: p.getItemData
  };
  return <MyTable {...mp} />;
};

export const ExampleName = "My infinite table test";

