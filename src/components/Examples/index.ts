// import React from 'react';

import { AppProps } from "../../types";
import * as ExFixed from "./ExFixed";
import * as ExFixed2 from "./ExFixed2";
import * as ExGridFixed from "./ExGridFixed";
import * as GridExample1 from "./GridExample";
import * as ItemExample1 from "./ItemExample";
import * as ItemExample2 from "./ItemExample2";
import * as ItemExample3 from "./ItemExample3";
import * as ItemExample4 from "./ItemExample4";
import * as ExMyTable from "./ExMyTable";
import * as ExMyTableRaw from "./ExMyTableRaw";

// import * as DataGridExample1 from "./ExDataGrid";
// import * as ReactTableExample1 from "./ExReactTable";

// { name: ReactTableExample1.ExampleName, comp: p => ReactTableExample1.ExampleComponent(p) },
// { name: DataGridExample1.ExampleName, comp: p => DataGridExample1.ExampleComponent(p) },

export interface ExampleType {
  name: string;
  comp: (p: AppProps) => JSX.Element
}

export const Examples: ExampleType[] = [
  { name: ExMyTable.ExampleName, comp: p => ExMyTable.ExampleComponent(p) },
  { name: ExMyTableRaw.ExampleName, comp: p => ExMyTableRaw.ExampleComponent(p) },
  { name: ExGridFixed.ExampleName, comp: p => ExGridFixed.ExampleComponent(p) },
  { name: ItemExample1.ExampleName, comp: p => ItemExample1.ExampleComponent(p) },
  { name: ItemExample2.ExampleName, comp: p => ItemExample2.ExampleComponent(p) },
  { name: ItemExample3.ExampleName, comp: p => ItemExample3.ExampleComponent(p) },
  { name: ItemExample4.ExampleName, comp: p => ItemExample4.ExampleComponent(p) },
  { name: GridExample1.ExampleName, comp: p => GridExample1.ExampleComponent(p) },
  { name: ExFixed.ExampleName, comp: p => ExFixed.ExampleComponent(p) },
  { name: ExFixed2.ExampleName, comp: p => ExFixed2.ExampleComponent(p) },
]
