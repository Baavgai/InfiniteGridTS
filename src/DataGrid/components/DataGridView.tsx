import React from "react";
import { DataGridState } from "../types";

import { MultiGrid, InfiniteLoader, MultiGridProps } from "react-virtualized";

const GridStyle: Pick<MultiGridProps, "style" | "styleBottomLeftGrid" | "styleTopLeftGrid" | "styleTopRightGrid"> = {
  style: { border: '1px solid #ddd' },
  styleBottomLeftGrid: { borderRight: '2px solid #aaa', backgroundColor: '#f7f7f7' },
  styleTopLeftGrid: { borderBottom: '2px solid #aaa', borderRight: '2px solid #aaa', fontWeight: 'bold', },
  styleTopRightGrid: { borderBottom: '2px solid #aaa', fontWeight: 'bold', }
}


export const DataGridView = (p: DataGridState) =>
  <InfiniteLoader
    isRowLoaded={x => p.getRow(x.index) !== undefined}
    loadMoreRows={x => p.loadRows(x.startIndex, x.stopIndex)}
    rowCount={p.totalRows}

  >{ilp =>
    <MultiGrid
      {...GridStyle}
      onSectionRendered={x => ilp.onRowsRendered({ startIndex: x.rowStartIndex, stopIndex: x.rowStopIndex })}
      cellRenderer={x => p.columns[x.columnIndex].cellRenderer({ ...x, ...p.columns[x.columnIndex] })}
      columnWidth={x => p.columns[x.index].colWidth}
      columnCount={p.columns.length}
      height={p.viewHeight}
      rowHeight={p.rowHeight}
      rowCount={p.totalRows}
      width={p.viewWidth}
      hideTopRightGridScrollbar={true}
      hideBottomLeftGridScrollbar={true}
      enableFixedColumnScroll={true}
      enableFixedRowScroll={true}
      fixedColumnCount={1}
      fixedRowCount={1}
    />
    }
  </InfiniteLoader>;
