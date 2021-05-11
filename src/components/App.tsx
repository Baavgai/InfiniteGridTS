import React, { useState } from 'react';
import { Layout } from "./Layout"
import { ContentView } from "./ContentView";
import { AppProps } from "../types";

const useAppProps = (): AppProps => {
  const [selectedExample, setSelectedExample] = useState(0);
  const selectExample = (x: number) => setSelectedExample(x);

  return { 
    selectedExample, 
    selectExample,
    loadDelay: 1200,
    height: 600
   };
}

const Content = () => {
  const p = useAppProps();
  return <ContentView {...p} />;
};

export const App = () =>
  <Layout>
    <Content />
  </Layout>;
