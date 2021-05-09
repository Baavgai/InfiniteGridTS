export const ALL_EXAMPLES = ["exG1", "exL1", "exL2", "exL3"] as const;
export type ExampleType = (typeof ALL_EXAMPLES)[number];


// export type ExampleType = "exG1" | "exL1" | "exL2" | "exL3";

export interface AppState {
  selected: ExampleType;
}

export interface AppController {
  selectExample: (x: ExampleType) => void;
}

export type AppProps = AppState & AppController;

