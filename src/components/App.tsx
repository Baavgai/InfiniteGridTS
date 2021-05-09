import React, { useState } from 'react';
import { Layout } from "./Layout"
import { ContentView } from "./ContentView";

import { AppProps, AppState, ExampleType, ALL_EXAMPLES } from "../types";

const useAppProps = (): AppProps => {
  const [state, setState] = useState<AppState>({ selected: ALL_EXAMPLES[0] });
  const selectExample = (selected: ExampleType) => setState({ selected });
  return { ...state, selectExample };
}

const Content = () => {
  const p = useAppProps();
  return <ContentView {...p} />;
};

export const App = () =>
  <Layout>
    <Content />
  </Layout>;
