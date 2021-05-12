import { useMemo } from 'react';
import DataGrid, { Column, FormatterProps } from 'react-data-grid';
import { AppProps } from "../../types";

type Row = undefined;
const rows: readonly Row[] = Array(1000);

function CellFormatter(props: FormatterProps<Row>) {
  return <>{props.column.key}&times;{props.rowIdx}</>;
}

function MillionCells() {
  const columns = useMemo((): readonly Column<Row>[] => {
    const columns: Column<Row>[] = [];

    for (let i = 0; i < 1000; i++) {
      const key = String(i);
      columns.push({
        key,
        name: key,
        frozen: i < 5,
        resizable: true,
        formatter: CellFormatter
      });
    }

    return columns;
  }, []);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowHeight={22}
      className="fill-grid"
    />
  );
}

export const ExampleComponent = (ap: AppProps) =>
  <MillionCells />;


export const ExampleName = "Data Grid MillionCells";


/*
import React from "react";
import { FixedSizeList as List, FixedSizeListProps } from "react-window";
import { AppProps } from "../../types";


import DataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

function App() {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
    />
  );
}

/*
import { useMemo } from 'react';
import DataGrid from '../../src';
import type { Column, FormatterProps } from '../../src';

type Row = undefined;
const rows: readonly Row[] = Array(1000);

function CellFormatter(props: FormatterProps<Row>) {
  return <>{props.column.key}&times;{props.rowIdx}</>;
}

export function MillionCells() {
  const columns = useMemo((): readonly Column<Row>[] => {
    const columns: Column<Row>[] = [];

    for (let i = 0; i < 1000; i++) {
      const key = String(i);
      columns.push({
        key,
        name: key,
        frozen: i < 5,
        resizable: true,
        formatter: CellFormatter
      });
    }

    return columns;
  }, []);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowHeight={22}
      className="fill-grid"
    />
  );
}

MillionCells.storyName = 'A Million Cells';
*/