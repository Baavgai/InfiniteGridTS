import { useState } from "react";
import faker from "faker";
import { wait } from "../functions";

export interface Item {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}


const createItem = (id: number): Item => ({
  id,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: Math.floor(Math.random() * 30) + 18,
});

interface State {
  // cache: { [index: number]: Item };
  cache: Record<number, Item>;
}

export interface InfinityDataTesterState {
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<any>;
  getItemData: (index: number) => Item | undefined;
}


const updateStatus = (startIndex: number, stopIndex: number, liveLoad: boolean) => (s: State): State => {
  console.log({ fn: "updateStatus", startIndex, stopIndex, liveLoad })
  const { cache } = s;
  for (let index = startIndex; index <= stopIndex; index++) {
    if (liveLoad) {
      cache[index] = createItem(index + 1);
    } else {
      delete cache[index];
    }
  }
  console.log({ fn: "updateStatus", startIndex, stopIndex, cache })
  return { cache };
};

export const useInfinityDataTester = (delay?: number): InfinityDataTesterState => {
  const [state, setState] = useState<State>({ cache: {} });
  console.log(state);
  const isItemLoaded = (i: number) => {
    const loaded = state.cache[i] !== undefined;
    console.log({ loaded })
    return loaded;
  }

  return {
    isItemLoaded,
    getItemData: i => isItemLoaded(i) ? state.cache[i] : undefined,
    loadMoreItems: (startIndex, stopIndex) => {
      setState(updateStatus(startIndex, stopIndex, false));
      return wait(delay ?? 1500)
        .then(() => setState(updateStatus(startIndex, stopIndex, true)));
    }
  }
};
