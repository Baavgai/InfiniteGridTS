import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { DataGridState } from "../types";


const Row = (p: DataGridState) => ({ index, style }: ListChildComponentProps) => {
  const row = p.getRow(index);
  return row === undefined
    ? <div key={index} style={style}>Loading</div>
    : <div key={index} style={style}>{p.columns.map(x => x.cellRenderer(x.getProps(index, row)))}</div>
};

export const DataGridBody = (p: DataGridState) =>
  <List
    height={p.gridHeight}
    itemSize={p.rowHeight}
    width={p.rowWidth}
    itemCount={p.totalRows}
    onItemsRendered={p.onItemsRendered}
    ref={p.ref}
  >
    {Row(p)}
  </List>

