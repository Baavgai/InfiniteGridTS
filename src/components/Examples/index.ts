// import React from 'react';

import { AppProps } from "../../types";
import * as ExFixed from "./ExFixed";
import * as GridExample1 from "./GridExample";
import * as ItemExample1 from "./ItemExample";
import * as ItemExample2 from "./ItemExample2";
import * as ItemExample3 from "./ItemExample3";
import * as ItemExample4 from "./ItemExample4";

export interface ExampleType {
  name: string;
  comp: (p: AppProps) => JSX.Element
}

export const Examples: ExampleType[] = [
  { name: ItemExample1.ExampleName, comp: p => ItemExample1.ExampleComponent(p) },
  { name: ItemExample2.ExampleName, comp: p => ItemExample2.ExampleComponent(p) },
  { name: ItemExample3.ExampleName, comp: p => ItemExample3.ExampleComponent(p) },
  { name: ItemExample4.ExampleName, comp: p => ItemExample4.ExampleComponent(p) },
  { name: GridExample1.ExampleName, comp: p => GridExample1.ExampleComponent(p) },
  { name: ExFixed.ExampleName, comp: p => ExFixed.ExampleComponent(p) },
]
