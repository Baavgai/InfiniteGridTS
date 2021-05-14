import React from "react";
import { CellRenderProps } from "../types";

import { GridCellProps } from "react-virtualized";

export function DefaultCellRenderer<T>(p: GridCellProps & CellRenderProps<T>) {
  return (
    <div key={p.key} style={p.style}>{p.getValue(p).cellValue ?? ""}</div>
  );
}
