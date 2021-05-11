import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useInfinityTester, InfinityTesterState } from "../useInfinityTester";
import { AppProps } from "../../types";

const Cell = (p: InfinityTesterState) => ({ index, style }: ListChildComponentProps) => {
  const label = p.isItemLoaded(index)
    ? `Item (${index})`
    : "Loading...";
  return (
    <div className="ListItem" style={style}>
      {label}
    </div>
  );
};

const View = (p: InfinityTesterState & AppProps) =>
  <InfiniteLoader
    {...p}
    itemCount={1000}
  >
    {({ onItemsRendered, ref }) => (
      <List
        className="List"
        height={p.height}
        itemCount={1000}
        itemSize={32}
        onItemsRendered={onItemsRendered}
        ref={ref}
        width={300}
      >
        {Cell(p)}
      </List>
    )}
  </InfiniteLoader>;

export const ExampleComponent = (ap: AppProps) => {
  const p = useInfinityTester(ap.loadDelay);
  return <View {...p} {...ap} />;
};

export const ExampleName = "Items react-window-infinite-loader";

