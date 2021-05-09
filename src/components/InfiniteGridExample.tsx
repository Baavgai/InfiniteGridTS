import React from "react";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useInifinityTester, InifinityTesterState } from "./useInifinityTester";

const NUM_COLUMNS = 4;

const Cell = (p: InifinityTesterState) => ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
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

const View = (p: InifinityTesterState) =>
  <InfiniteLoader
    {...p}
    itemCount={1000}
  >
    {({ onItemsRendered, ref }) => (
        <Grid
        className="List"
        columnCount={NUM_COLUMNS}
        columnWidth={100}
        height={150}
        rowCount={1000}
        rowHeight={35}
        onItemsRendered={gridProps => {
          onItemsRendered({
            overscanStartIndex:
              gridProps.overscanRowStartIndex * NUM_COLUMNS,
            overscanStopIndex: gridProps.overscanRowStopIndex * NUM_COLUMNS,
            visibleStartIndex: gridProps.visibleRowStartIndex * NUM_COLUMNS,
            visibleStopIndex: gridProps.visibleRowStopIndex * NUM_COLUMNS
          });
        }}
        ref={ref}
        width={300}
      >
        {Cell(p)}
      </Grid>
  )}
  </InfiniteLoader>;

export const InfiniteGridExample = () => {
  const p = useInifinityTester(500);
  return <View {...p} />;
};
