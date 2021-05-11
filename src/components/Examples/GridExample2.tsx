import React from "react";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import { useBottomless } from "../../Bottomlesss/useBottomlessStandAlone";
import { useInfinityTester, InfinityTesterState } from "../useInfinityTester";
import { AppProps } from "../../types";

const NUM_COLUMNS = 4;

const Cell = (p: InfinityTesterState) => ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
  const index = rowIndex * NUM_COLUMNS + columnIndex;
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
    <Grid
    className="List"
    columnCount={NUM_COLUMNS}
    columnWidth={100}
    height={p.height}
    rowCount={1000}
    rowHeight={35}
    onItemsRendered={gridProps => bs.onItemsRendered({
      visibleStartIndex: gridProps.visibleRowStartIndex * NUM_COLUMNS,
      visibleStopIndex: gridProps.visibleRowStopIndex * NUM_COLUMNS
    })}
    ref={bs.ref}
    width={300}
  >
    {Cell(p)}
</Grid>);
};

export const ExampleComponent = (ap: AppProps) => {
  const p = useInfinityTester(ap.loadDelay);
  return <View {...p} {...ap} />;
};
export const ExampleName = "Grid react-window-infinite-loader";

