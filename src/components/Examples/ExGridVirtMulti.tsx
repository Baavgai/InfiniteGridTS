
import React from 'react';

import { AutoSizer, MultiGrid, GridCellRenderer } from "react-virtualized";

interface State {
  fixedColumnCount: number;
  fixedRowCount: number;
  scrollToColumn: number;
  scrollToRow: number;
};

interface Controller {
  cellRenderer: GridCellRenderer;
}

type Props = State & Controller;


const STYLE: React.CSSProperties = {
  border: '1px solid #ddd',
};
const STYLE_BOTTOM_LEFT_GRID: React.CSSProperties = {
  borderRight: '2px solid #aaa',
  backgroundColor: '#f7f7f7',
};
const STYLE_TOP_LEFT_GRID: React.CSSProperties = {
  borderBottom: '2px solid #aaa',
  borderRight: '2px solid #aaa',
  fontWeight: 'bold',
};
const STYLE_TOP_RIGHT_GRID: React.CSSProperties = {
  borderBottom: '2px solid #aaa',
  fontWeight: 'bold',
};


const MultiGridExampleView = ({ cellRenderer, ...s }: Props) =>
  <AutoSizer disableHeight>
    {({ width }) => (
      <MultiGrid
        {...s}
        cellRenderer={cellRenderer}
        columnWidth={75}
        columnCount={50}
        enableFixedColumnScroll
        enableFixedRowScroll
        height={300}
        rowHeight={40}
        rowCount={100}
        style={STYLE}
        styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
        styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
        styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
        width={width}
        hideTopRightGridScrollbar
        hideBottomLeftGridScrollbar
      />
    )}
  </AutoSizer>;

const MultiGridExample = () =>
  <MultiGridExampleView
    fixedColumnCount={2}
    fixedRowCount={1}
    scrollToColumn={0}
    scrollToRow={0}
    cellRenderer={({ columnIndex, key, rowIndex, style }) => {
      return (
        <div className="Cell" key={key} style={style}>
          {columnIndex}, {rowIndex}
        </div>
      );
    }}
  />;


export const ExampleComponent = (p: {}) =>
  <MultiGridExample />;


export const ExampleName = "ExGridVirtMulti";

/*
const MultiGridExample = () => {
  const [state, setState] = useState<State>({
    fixedColumnCount: 2,
    fixedRowCount: 1,
    scrollToColumn: 0,
    scrollToRow: 0,
  });
  const p: Props = {
    ...state,
    cellRenderer: ({ columnIndex, key, rowIndex, style }) => {
      return (
        <div className="Cell" key={key} style={style}>
          {columnIndex}, {rowIndex}
        </div>
      );
    }
  };
}

*/