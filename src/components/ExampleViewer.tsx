import React from 'react';

import { AppProps, ExampleType } from "../types";
import { InfiniteItemExample } from "./InfiniteItemExample";
import { InfiniteItemExample as InfiniteItemExample2 } from "./InfiniteItemExample2";
import { InfiniteItemExample as InfiniteItemExample3 } from "./InfiniteItemExample3";
import { InfiniteGridExample } from "./InfiniteGridExample";
import { ExFixed } from "./ExFixed";



const viewComps: Record<ExampleType, () => JSX.Element> = {
  "exL1": () => <InfiniteItemExample />,
  "exL2": () => <InfiniteItemExample2 />,
  "exL3": () => <InfiniteItemExample3 />,
  "exG1": () => <InfiniteGridExample />,
  "exFixed": () => <ExFixed />,
};

export const ExampleViewer = (p: AppProps) => viewComps[p.selected]()