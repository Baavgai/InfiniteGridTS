import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { useBottomless } from "../../Bottomlesss/useBottomless";
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

const View = (p: InfinityTesterState & AppProps) => {
  const bs = useBottomless({ itemCount: 1000, isItemLoaded: p.isItemLoaded, loadMoreItems: p.loadMoreItems });
  return (
    <List
      className="List"
      height={p.height}
      itemCount={1000}
      itemSize={32}
      onItemsRendered={bs.onItemsRendered}
      ref={bs.ref}
      width={300}
    >
      {Cell(p)}
    </List>
  );
};

export const ExampleComponent = (ap: AppProps) => {
  const p = useInfinityTester(ap.loadDelay);
  return <View {...p} {...ap} />;
};

export const ExampleName = "Items hook";

