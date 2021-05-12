import { useState } from "react";

import { wait } from "../functions";

interface State {
  loadStatus: { [index: number]: boolean };
}

export interface InfinityTesterState {
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<any>;
}

const updateStatus = (startIndex: number, stopIndex: number, value: boolean) => (s: State): State => {
  const { loadStatus } = s;
  for (let index = startIndex; index <= stopIndex; index++) {
    loadStatus[index] = value;
  }
  return { loadStatus };
};

export const useInfinityTester = (delay?: number): InfinityTesterState => {
  const [state, setState] = useState<State>({ loadStatus: {} });

  return {
    isItemLoaded: i => !!state.loadStatus[i],
    loadMoreItems: (startIndex, stopIndex) => {
      setState(updateStatus(startIndex, stopIndex, false));
      return wait(delay ?? 1500)
        .then(() => setState(updateStatus(startIndex, stopIndex, true)));
    }
  }
};

/*
  const updateStatus = useCallback((startIndex: number, stopIndex: number, value: boolean) => (s:State) => {
    const {loadStatus} = s;
    for (let index = startIndex; index <= stopIndex; index++) {
      loadStatus[index] = value;
    }
    return {loadStatus};
  }, []);

*/