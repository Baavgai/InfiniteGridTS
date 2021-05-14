import React from "react";
import { CellRenderProps } from "../types";

import { GridCellProps } from "react-virtualized";

export function DefaultHeaderRenderer<T>(p: GridCellProps & CellRenderProps<T>) {
  return (
    <div key={p.key} style={p.style}>{p.colName}</div>
  );
}
