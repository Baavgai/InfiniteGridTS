import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { useBottomless } from "../../Bottomlesss/useBottomlessStandAlone";
import { useInfinityDataTester, InfinityDataTesterState, Item } from "../useInfinityDataTester";
import { AppProps } from "../../types";

interface Column<T> {
  field: keyof T;
  size: number;
  ofs: number;
}

const Columns: Column<Item>[] = [
  {field: "id", size: 75, ofs: 0 },
  {field: "firstName", size: 200, ofs: 75 },
  {field: "lastName", size: 200, ofs: 275 },
  {field: "age", size: 50, ofs: 475 }
];

const RowWidth =  Columns.reduce((acc,x) => acc + x.size, 0);
// style={{ top: index * p.itemSize, left: 0, width: "100%", height: p.itemSize }}

type ViewProps = InfinityDataTesterState & AppProps & { itemSize: number};

const Row = (p: ViewProps) => ({ index, style }: ListChildComponentProps) => {
  const data = p.getItemData(index);
  return data === undefined
    ? <div style={style}></div>
    : <div style={style}> {Columns.map(x => <div style={{ position: "absolute", left: x.ofs, width: x.size, height: p.itemSize }}>{data[x.field]}</div>)}</div>
};

const View = (p: ViewProps) => {
  const bs = useBottomless({ itemCount: 1000, isItemLoaded: p.isItemLoaded, loadMoreItems: p.loadMoreItems });
  return (
    <List
      {...bs}
      height={p.height}
      itemSize={p.itemSize}
      width={RowWidth}
    >
      {Row(p)}
    </List>
  );
};

const Layout: React.FC = p =>
  <div className="table">
    <div>
      <div className="tr">
        <div className="th">Head1</div>
        <div className="th">Head2</div>
      </div>
    </div>
    {p.children}
  </div>;


export const ExampleComponent = (ap: AppProps) => {
  const p = useInfinityDataTester(ap.loadDelay);
  return <Layout><View {...p} {...ap} itemSize={32} /></Layout>;
};

export const ExampleName = "My infinite table test no hook";

