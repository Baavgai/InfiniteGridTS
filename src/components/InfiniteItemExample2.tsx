import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { InfiniteLoader } from "../Bottomlesss/InfiniteLoader";
import { useInifinityTester, InifinityTesterState } from "./useInifinityTester";

const Cell = (p: InifinityTesterState) => ({ index, style }: ListChildComponentProps) => {
  const label = p.isItemLoaded(index)
    ? `Item (${index})`
    : "Loading...";
  return (
    <div className="ListItem" style={style}>
      {label}
    </div>
  );
};

const View = (p: InifinityTesterState) =>
  <InfiniteLoader
    {...p}
    itemCount={1000}
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
        {Cell(p)}
      </List>
    )}
  </InfiniteLoader>;

export const InfiniteItemExample = () => {
  const p = useInifinityTester(500);
  return <View {...p} />;
};
