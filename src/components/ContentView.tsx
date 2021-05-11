import React from 'react';

import { AppProps } from "../types";
import { Examples } from "./Examples";

const ChooseItem = (p: AppProps & { index: number }) =>
<li
      className={"list-group-item" + (p.index === p.selectedExample ? " active" : "")}
      onClick={() => p.selectExample(p.index)}
    >{Examples[p.index].name}</li>;


const Choose = (p: AppProps) =>
  <ul className="list-group">
    {Examples.map((_, i) => <ChooseItem key={i} {...p} index={i} />)}
  </ul>;

export const ContentView = (p: AppProps) =>
  <>
    <div className="row">
      <div className="col-3">Choose</div>
      <div className="col">{Examples[p.selectedExample].name}</div>
    </div>
    <div className="row">
      <div className="col-3"><Choose {...p} /></div>
      <div className="col">{Examples[p.selectedExample].comp(p)}</div>
    </div>
  </>
  ;
