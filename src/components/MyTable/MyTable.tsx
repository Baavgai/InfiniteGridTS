import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { useMyTableState, MyTableState } from "./useMyTableState";
import { MyTableProps } from "./types";

const Row = (p: MyTableState) => ({ index, style }: ListChildComponentProps) => {
  const row = p.getRow(index);
  return row === undefined
    ? <div key={index} style={style}>Loading</div>
    : <div key={index} style={style}>{p.columns.map(x => x.cellRender({...x, row, rowIndex: index}))}</div>
};

const TableBody = (p: MyTableState) =>
  <List
    height={p.viewHeight}
    itemSize={p.rowHeight}
    width={p.rowWidth}
    itemCount={p.totalRows}
    onItemsRendered={p.onItemsRendered}
    ref={p.ref}
  >
    {Row(p)}
  </List>

const TableHead = (p: MyTableState) =>
  <div style={{ position: "relative", left: 0, width: p.rowWidth, height: p.rowHeight }}>
    {p.columns.map((x,i) => <div key={i} style={x.style}>{x.name}</div>)}
  </div>;

const Layout = (p: MyTableState) =>
  <>
    <TableHead {...p} />
    <TableBody  {...p} />
  </>;


export const MyTable = (p: MyTableProps) => {
  const s = useMyTableState(p);
  // console.log(s);
  return <Layout {...s} />;
};
// <div style="position: relative; height: 600px; width: 525px; overflow: auto; will-change: transform; direction: ltr;"><div style="height: 35000px; width: 100%;"><div style="position: absolute; left: 0px; top: 0px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 35px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 70px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 105px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 140px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 175px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 210px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 245px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 280px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 315px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 350px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 385px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 420px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 455px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 490px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 525px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 560px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 595px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 630px; height: 35px; width: 100%;"></div><div style="position: absolute; left: 0px; top: 665px; height: 35px; width: 100%;"></div></div></div>
