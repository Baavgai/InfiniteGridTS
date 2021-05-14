import React, { forwardRef } from "react";
// import { FixedSizeList as List } from "react-window";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import { AppProps } from "../../types";

const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const NUM_COLUMNS = COLS.length;
const COL_WIDTH = 100;


interface State {
  itemSize: number;
}



const Row = (p: GridChildComponentProps) =>
  <div className="nonstick" style={p.style}>R{p.rowIndex} C{p.columnIndex}</div>;


const HeadCell = (p: State & { colNum: number }) =>
  <div style={{ top: 0 * p.itemSize, left: p.colNum * COL_WIDTH, width: COL_WIDTH, height: p.itemSize }}>
    Head {COLS[p.colNum]}
  </div>

const Header = (p: State) => (
  <div className="sticky" style={{ top: 0 * p.itemSize, left: 0, width: "100%", height: p.itemSize }}>
    {COLS.map((_, i) => <HeadCell {...p} colNum={i} />)}
  </div>
);

const innerElementType = (p: State) =>
  forwardRef<any>(
    ({ children, ...rest }, ref) => {
      console.log({ rest })
      return <div ref={ref} {...rest}><Header {...p} />{children}</div>
    }

  );

const StickyGrid = (p: State & AppProps) =>
  <Grid
    className="List"
    innerElementType={innerElementType(p)}
    columnCount={NUM_COLUMNS}
    columnWidth={COL_WIDTH}
    height={p.height}
    rowCount={1000}
    rowHeight={35}
    width={800}
  >
    {ip => ip.rowIndex === 0 ? null : <Row {...ip} rowIndex={ip.rowIndex - 1} />}
  </Grid>;


export const ExampleComponent = (p: AppProps) =>
  <StickyGrid {...p} itemSize={35} />


export const ExampleName = "ExGridFixed: Grid Sticky fixed head";
