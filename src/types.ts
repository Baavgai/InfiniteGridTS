export interface AppState {
  selectedExample: number;
  loadDelay: number;
  height: number;
}

export interface AppController {
  selectExample: (x: number) => void;
}

export type AppProps = AppState & AppController;
