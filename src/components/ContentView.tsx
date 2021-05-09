import React from 'react';

import { AppProps, ExampleType, ALL_EXAMPLES } from "../types";
import { InfiniteItemExample } from "./InfiniteItemExample";
import { InfiniteItemExample as InfiniteItemExample2 } from "./InfiniteItemExample2";
import { InfiniteItemExample as InfiniteItemExample3 } from "./InfiniteItemExample3";
import { InfiniteGridExample } from "./InfiniteGridExample";


const viewName: Record<ExampleType, string> = {
  "exL1": "Items react-window-infinite-loader",
  "exL2": "Items TS trans react-window-infinite-loader",
  "exL3": "Itema hook",
  "exG1": "Grid react-window-infinite-loader",
};

const viewComps: Record<ExampleType, () => JSX.Element> = {
  "exL1": () => <InfiniteItemExample />,
  "exL2": () => <InfiniteItemExample2 />,
  "exL3": () => <InfiniteItemExample3 />,
  "exG1": () => <InfiniteGridExample />,
};


const Choose = (p: AppProps) =>
  <select className="form-select" onChange={x => p.selectExample(x.target.value as any)} value={p.selected}>
    {ALL_EXAMPLES.map(x => <option key={x} value={x}>{viewName[x]}</option>)}
  </select>;

export const ContentView = (p: AppProps) =>
  <div className="row">
    <div className="col-3"><Choose {...p} /></div>
    <div className="col">{viewComps[p.selected]}</div>
  </div>;
