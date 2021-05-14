
import React from 'react';
import { AutoSizer, MultiGrid, GridCellRenderer, MultiGridProps } from "react-virtualized";

interface ViewProps {

}

const Cell: GridCellRenderer = ({ columnIndex, key, rowIndex, style }) =>
  <div className="Cell" key={key} style={style}>
    {columnIndex}, {rowIndex}
  </div>;

const GridStyle: Pick<MultiGridProps, "style" | "styleBottomLeftGrid" | "styleTopLeftGrid" | "styleTopRightGrid"> = {
  style: { border: '1px solid #ddd' },
  styleBottomLeftGrid: { borderRight: '2px solid #aaa', backgroundColor: '#f7f7f7' },
  styleTopLeftGrid: { borderBottom: '2px solid #aaa', borderRight: '2px solid #aaa', fontWeight: 'bold', },
  styleTopRightGrid: { borderBottom: '2px solid #aaa', fontWeight: 'bold', }
}


const View = (p: ViewProps) =>
  <AutoSizer disableHeight>
    {({ width }) => (
      <MultiGrid
        {...GridStyle}
        fixedColumnCount={1}
        fixedRowCount={1}

        cellRenderer={Cell}
        columnWidth={75}
        columnCount={50}
        enableFixedColumnScroll
        enableFixedRowScroll
        height={300}
        rowHeight={40}
        rowCount={100}
        width={width}
        hideTopRightGridScrollbar
        hideBottomLeftGridScrollbar
      />
    )}
  </AutoSizer>;



export const ExampleComponent = (p: {}) =>
  <View />;


export const ExampleName = "ExGridVirtMulti2";

/*
MultiGridProps
*/