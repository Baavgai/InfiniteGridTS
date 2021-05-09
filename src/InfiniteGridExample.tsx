import React from "react";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

type ItemState = "loading" | "loaded";

const NUM_COLUMNS = 3;
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

const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
  const itemIndex = rowIndex * NUM_COLUMNS + columnIndex;
  const label = itemStatusMap[itemIndex] === "loaded"
    ? `Cell (${rowIndex}, ${columnIndex})`
    : "Loading...";
  return (
    <div className="ListItem" style={style}>
      {label}
    </div>
  );
};

export const InfiniteGridExample = () =>
  <>
    <p className="Note">
      This demo app mimics loading remote data with a 1.5s timer. While rows
      are "loading" they will display a "Loading..." label. Once data has been
      "loaded" the row number will be displayed. Start scrolling the list to
      automatically load data.
      </p>
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={1000}
      loadMoreItems={loadMoreItems}
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
          {Cell}
        </Grid>
      )}
    </InfiniteLoader>
    <p className="Note">
      Check out the documentation to learn more:
        <br />
      <a href="https://github.com/bvaughn/react-window-infinite-loader#documentation">
        github.com/bvaughn/react-window-infinite-loader
        </a>
    </p>
  </>
