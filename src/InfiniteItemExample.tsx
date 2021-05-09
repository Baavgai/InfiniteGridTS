import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

type ItemState = "loading" | "loaded";

let itemStatusMap: { [index: number]: ItemState } = {};

const isItemLoaded = (index: number) => !!itemStatusMap[index];

const wait = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

const loadMoreItems = (startIndex: number, stopIndex: number) => {
  const updateStatus = (value: ItemState) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = value;
    }
  };
  updateStatus("loading");
  return wait(1500).then(() => updateStatus("loaded"));
};

const Cell = ({ index, style }: ListChildComponentProps) => {
  const label = itemStatusMap[index] === "loaded"
    ? `Item (${index})`
    : "Loading...";
  return (
    <div className="ListItem" style={style}>
      {label}
    </div>
  );
};

export const InfiniteItemExample = () =>
  <>
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={1000}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          className="List"
          height={150}
          itemCount={1000}
          itemSize={32}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={300}
        >
          {Cell}
        </List>
      )}
    </InfiniteLoader>
  </>;
