// https://codesandbox.io/s/react-virtualized-infinite-scrolling-with-grid-1dmsf?file=/src/Demo.js:0-7659
import React, { useState } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Grid,
  InfiniteLoader,
  GridCellRenderer,
  SectionRenderedParams,
  InfiniteLoaderChildProps
} from "react-virtualized";



const MIN_BATCH_SIZE = 40;

// Return random snippet of lorem ipsum text
const randText = () => {
  const text = [
    "Lorem ipsum dolor sit amet.",
    "Consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident.",
    "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ];

  return text[Math.floor(Math.random() * text.length)];
};

// this._cache = new CellMeasurerCache({  fixedWidth: true,  defaultHeight: 30});

type RowType = [string, string, string];

const randRow = (): RowType => [randText(), randText(), randText()];

const wait = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));


interface State {
  data: RowType[];
  columnCount: number;
  columnWidth: number;
  rowCount: number;
  isLoading: boolean;
  cache: CellMeasurerCache;
  // grid?: Grid;
};

interface Controller {
  isRowLoaded: (p: { index: number }) => boolean;
  loadMoreRows: (p: { startIndex: number, stopIndex: number }) => Promise<any>;
  onResize: (grid?: Grid) => (p: { width: number; height: number }) => void;
  cellRenderer: GridCellRenderer;
  onSectionRendered: (loaderProps: InfiniteLoaderChildProps) => (p: SectionRenderedParams) => any;
}

type Props = State & Controller;

const DemoView = (p: Props) =>

  <InfiniteLoader
    isRowLoaded={p.isRowLoaded}
    loadMoreRows={p.loadMoreRows}
    rowCount={p.rowCount}
    threshold={1}

  >
    {loaderProps =>
      <AutoSizer>
        {({ height, width }) => {
          console.log({ height, width, cache: p.cache });
          return <Grid
            width={width}
            height={height}
            columnWidth={p.columnWidth}
            columnCount={p.columnCount}
            rowCount={p.rowCount}
            rowHeight={p.cache.rowHeight}
            cellRenderer={p.cellRenderer}
            onSectionRendered={p.onSectionRendered(loaderProps)}
            ref={loaderProps.registerChild}
          />;
        }}
      </AutoSizer>
    }
  </InfiniteLoader>;


// ref={grid => { this._grid = grid; registerChild(grid); }}

const Demo = () => {
  // const [loaderProps, setLoaderProps] = useState<InfiniteLoaderChildProps | undefined>();

  const [state, setState] = useState<State>({
    data: [],
    columnCount: 3,
    columnWidth: 100,
    rowCount: 1,
    isLoading: false,
    cache: new CellMeasurerCache({ fixedWidth: true, defaultHeight: 30 })
  });
  console.log(state)

  const p: Props = {
    ...state,
    isRowLoaded: x => {
      // console.log({fn: "isRowLoaded", ...x})
      return x.index < state.rowCount - 1;
    },
    loadMoreRows: x => {
      // console.log({fn: "loadMoreRows", ...x})
      if (!state.isLoading) {
        setState(s => ({ ...s, isLoading: true }));
        return wait(100 + Math.floor(Math.random() * 3000))  // random delay to simulate server response time
          .then(() => setState(({ data, ...s }) => {
            for (let i = 0; i < MIN_BATCH_SIZE; i++) {
              data.push(randRow());
            }
            return {
              ...s,
              isLoading: false,
              rowCount: data.length + 1,
              data
            }
          }));
      } else {
        return Promise.resolve();
      }
    },
    onResize: grid => p => setState(s => {
      // Subtracting 30 from `width` to accommodate the padding from the Bootstrap container
      s.cache.clearAll();
      grid && grid.recomputeGridSize();
      return { ...s, columnWidth: (p.width - 30) / s.columnCount };
    }),
    cellRenderer: ({ key, rowIndex, columnIndex, parent, style }) => {
      const { columnCount, columnWidth, rowCount, data } = state;
      let content;

      // Render cell content
      if (rowIndex < rowCount - 1) {
        const cellStyle = Object.assign({}, style, {
          backgroundColor: rowIndex % 2 ? null : "#eee"
        });

        content = (
          <div style={cellStyle}>
            <div style={{ padding: "20px" }}>
              {data[rowIndex][columnIndex] || (
                <em className="text-muted">empty</em>
              )}
            </div>
          </div>
        );
      } else if (columnIndex === 0) { // Render "loading" content
        // Remember this `index` so we can clear its measurements from the cache later
        // this._lastLoadingIndex = rowIndex;

        const cellStyle = Object.assign({}, style, {
          width: columnWidth * columnCount, // Give loader the full grid width
          textAlign: "center"
        });

        content = <div style={cellStyle}>Loading...</div>;
      } else { // Render empty cell (for incomplete rows)
        content = <div style={style} />;
      }

      return (
        <CellMeasurer
          key={key}
          cache={state.cache}
          parent={parent}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
        >
          {content}
        </CellMeasurer>
      );
    },
    onSectionRendered: loaderProps => ({ rowStartIndex, rowStopIndex }) => {
      loaderProps.onRowsRendered({
        startIndex: rowStartIndex,
        stopIndex: rowStopIndex
      });
    }
  };

  return <DemoView {...p} />
}



export const ExampleComponent = (p: {}) =>
  <Demo />;


export const ExampleName = "ExGridVirtMultiInifite";
