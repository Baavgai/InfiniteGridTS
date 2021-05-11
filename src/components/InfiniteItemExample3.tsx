import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { useBottomless } from "../Bottomlesss/useBottomless";
import { useInfinityTester, InfinityTesterState } from "./useInfinityTester";

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

const View = (p: InfinityTesterState) => {
  const bs = useBottomless({ itemCount: 1000, isItemLoaded: p.isItemLoaded, loadMoreItems: p.loadMoreItems });
  return (
    <List
      className="List"
      height={150}
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

export const InfiniteItemExample = () => {
  const p = useInfinityTester(500);

  return <View {...p} />;
};
