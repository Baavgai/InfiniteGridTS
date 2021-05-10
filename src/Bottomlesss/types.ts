import { Ref, RefObject, ReactNode } from "react";

export interface BottomlessRefProps {
  resetAfterIndex?: (index: number, shouldForceUpdate?: boolean) => void;
  getItemStyleCache?: (index: number) => void;
  forceUpdate?: () => void;
}

export type BottomlessRefType = RefObject<BottomlessRefProps>;

export type Ranges = [number, number][];

export interface OnItemsRenderedProps {
  visibleStartIndex: number;
  visibleStopIndex: number;
}

// visibleStartIndex: gridProps.visibleRowStartIndex * NUM_COLUMNS, visibleStopIndex: gridProps.visibleRowStopIndex * NUM_COLUMNS

export type OnItemsRendered = (props: OnItemsRenderedProps) => any;

export interface BottomlessState {
  onItemsRendered: OnItemsRendered;
  ref?: Ref<any>;
}

export interface BottomlessProps {
  // Function responsible for tracking the loaded state of each item.
  isItemLoaded: (index: number) => boolean;
  // Callback to be invoked when more rows must be loaded.
  // It should return a Promise that is resolved once all data has finished loading.
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<any>;
  // Number of rows in list; can be arbitrary high number if actual number is unknown.
  itemCount: number;
  // Minimum number of rows to be loaded at a time; defaults to 10.
  // This property can be used to batch requests to reduce HTTP requests.
  minimumBatchSize?: number;
  // Threshold at which to pre-fetch data; defaults to 15.
  // A threshold of 15 means that data will start loading when a user scrolls within 15 rows.
  threshold?: number;
}


export interface BottomlessComponentProps extends BottomlessProps {
  children: (props: BottomlessState) => ReactNode;
}


export const BottomlessDefaults = { minimumBatchSize: 10, threshold: 15, itemCount: 1000 };

/*
export interface RefProps {
  resetAfterIndex?: (index: number, shouldForceUpdate?: boolean) => void;
  getItemStyleCache?: (index: number) => void;
  forceUpdate: () => void;
}

*/