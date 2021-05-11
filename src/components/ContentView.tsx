import React from 'react';

import { AppProps, ExampleType, ALL_EXAMPLES } from "../types";
import { ExampleViewer } from "./ExampleViewer";


const viewName: Record<ExampleType, string> = {
  "exL1": "Items react-window-infinite-loader",
  "exL2": "Items TS trans react-window-infinite-loader",
  "exL3": "Items hook",
  "exG1": "Grid react-window-infinite-loader",
  "exFixed": "Sticky list head"
};


const Choose = (p: AppProps) =>
  <select className="form-select" onChange={x => p.selectExample(x.target.value as any)} value={p.selected}>
    {ALL_EXAMPLES.map(x => <option key={x} value={x}>{viewName[x]}</option>)}
  </select>;

export const ContentView = (p: AppProps) =>
  <>
    <div className="row">
      <div className="col-3">Choose</div>
      <div className="col">{viewName[p.selected]}</div>
    </div>
    <div className="row">
      <div className="col-3"><Choose {...p} /></div>
      <div className="col"><ExampleViewer {...p} /></div>
    </div>
  </>
  ;
