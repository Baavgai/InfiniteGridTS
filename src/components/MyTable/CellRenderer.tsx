import React from "react";
import { CellRenderProps } from "./types";

export const CellRender = (p: CellRenderProps) => 
  <div key={`${p.rowIndex}-${p.colIndex}`} style={p.style}>{
    p.row === undefined
    ? ""
    :p.row[p.field]
  }</div>