import React, { createRef, Fragment, PureComponent } from "react";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

const NUM_COLUMNS = 3;

let itemStatusMap: { [index: number]: boolean } = {};

const isItemLoaded = (index: number) => !!itemStatusMap[index];

const loadMoreItems = (startIndex: number, stopIndex: number) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = false;
  }
  return new Promise<void>(resolve =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = true;
      }
      resolve();
    }, 2500)
  );
};

const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
  let label;
  const itemIndex = rowIndex * NUM_COLUMNS + columnIndex;
  if (itemStatusMap[itemIndex] === true) {
    label = `Cell (${rowIndex}, ${columnIndex})`;
  } else {
    label = "Loading...";
  }
  return (
    <div className="ListItem" style={style}>
      {label}
    </div>
  );
};


export const App = () =>
  <>
    <p className="Note">
      This demo app mimics loading remote data with a 2.5s timer. While rows
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
  </>;
