import React from "react";
import { DataGridState } from "../types";
import { DataGridBody } from "./DataGridBody";
import { DataGridHead } from "./DataGridHead";

export const DataGridView = (p: DataGridState) =>
  <>
    <DataGridHead {...p} />
    <DataGridBody  {...p} />
  </>;
