import React, { useState } from 'react';
import { Layout } from "./Layout"
import { InfiniteItemExample } from "./InfiniteItemExample";
import { InfiniteGridExample } from "./InfiniteGridExample";


type ExampleType = "ex1" | "ex2";

interface AppState {
  selected: ExampleType;
}

interface AppController {
  selectExample: (x: ExampleType) => void;
}

type AppProps = AppState & AppController;

const useAppProps = (): AppProps => {
  const [state, setState] = useState<AppState>({ selected: "ex1" });
  const selectExample = (selected: ExampleType) => setState({ selected });
  return { ...state, selectExample };
}

const ExampleView = (p: AppState) => {
  switch (p.selected) {
    case "ex1":
      return <InfiniteItemExample />;
    case "ex2":
      return <InfiniteGridExample />;
    default:
      return <>Oops</>;
  }
};

const Choose = (p: AppProps) =>
  <select className="form-select" onChange={x => p.selectExample(x.target.value as any)} value={p.selected}>
    <option value="ex1">Example 1</option>
    <option value="ex2">Example 2</option>
  </select>;

const ContentView = (p: AppProps) =>
  <div className="row">
    <div className="col-3"><Choose {...p} /></div>
    <div className="col"><ExampleView {...p} /></div>
  </div>;

const Content = () => {
  const p = useAppProps();
  return <ContentView {...p} />;
};

export const App = () =>
  <Layout>
    <Content />
  </Layout>;
