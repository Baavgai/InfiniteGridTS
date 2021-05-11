export const ALL_EXAMPLES = ["exL1", "exL2", "exL3", "exG1", "exFixed"] as const;
export type ExampleType = (typeof ALL_EXAMPLES)[number];


export interface AppState {
  selected: ExampleType;
}

export interface AppController {
  selectExample: (x: ExampleType) => void;
}

export type AppProps = AppState & AppController;
