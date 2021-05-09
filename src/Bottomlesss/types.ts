// Ranges is array of pairs: [start0, stop0, start1, stop1, ..., startN, stopN]
// export type Ranges = Array<number>;
// export type Ranges = number[];

import { Ref, ReactNode } from "react";

export type Ranges = [number,number][];

export interface ListOnItemsRenderedProps {
    overscanStartIndex: number;
    overscanStopIndex: number;
    visibleStartIndex: number;
    visibleStopIndex: number;
}

export type OnItemsRendered = (props: ListOnItemsRenderedProps) => any;

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


export const BottomlessDefaults = {minimumBatchSize: 10, threshold: 15};

// declare class InfiniteLoader extends Component<InfiniteLoaderProps> {    resetloadMoreItemsCache(autoReload?: boolean): void;}




/*
export interface BottomlessLoaderProps extends BottomlessProps {
    children: (props: {onItemsRendered: OnItemsRendered, ref: Ref<any>}) => ReactNode;
}

type onItemsRenderedParams = {
    visibleStartIndex: number,
    visibleStopIndex: number,
  };
  type onItemsRendered = (params: onItemsRenderedParams) => void;
  type setRef = (ref: any) => void;
  
  export type Props = {|
    // Render prop.
    children: ({ onItemsRendered: onItemsRendered, ref: setRef }) => React$Node,
  
    // Function responsible for tracking the loaded state of each item.
    isItemLoaded: (index: number) => boolean,
  
    // Number of rows in list; can be arbitrary high number if actual number is unknown.
    itemCount: number,
  
    // Callback to be invoked when more rows must be loaded.
    // It should return a Promise that is resolved once all data has finished loading.
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>,
  
    // Renamed to loadMoreItems in v1.0.3; will be removed in v2.0
    loadMoreRows?: (startIndex: number, stopIndex: number) => Promise<void>,
  
    // Minimum number of rows to be loaded at a time; defaults to 10.
    // This property can be used to batch requests to reduce HTTP requests.
    minimumBatchSize?: number,
  
    // Threshold at which to pre-fetch data; defaults to 15.
    // A threshold of 15 means that data will start loading when a user scrolls within 15 rows.
    threshold?: number,
  |};
  

// Ranges is array of pairs: [start0, stop0, start1, stop1, ..., startN, stopN]
// export type Ranges = Array<number>;
*/