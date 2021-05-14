import React from "react";
import { CellRenderProps } from "../types";

export function CellRender<T>(p: CellRenderProps<T>) {
  return (
    <div key={`${p.rowIndex}-${p.colIndex}`} style={p.style}>{p.cellValue ?? ""}</div>
  );
}
