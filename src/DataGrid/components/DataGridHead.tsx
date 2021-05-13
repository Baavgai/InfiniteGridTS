import React from "react";

import { DataGridState } from "../types";

export const DataGridHead = (p: DataGridState) =>
  <div style={{ position: "relative", left: 0, width: p.rowWidth, height: p.rowHeight }}>
    {p.columns.map((x, i) => <div key={i} style={x.style}>{x.colName}</div>)}
  </div>;

