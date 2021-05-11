import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

interface ItemRendererProps {
  index: number;
  style: React.CSSProperties;
}

interface State {
  stickyIndices: number[];
  itemSize: number;
}

const Row = ({ index, style }: ItemRendererProps) => (
  <div className="nonstick" style={style}>
    Row {index}
  </div>
);

const StickyRow = ({ index, style }: ItemRendererProps) => (
  <div className="sticky" style={style}>
    Sticky Row {index}
  </div>
);

const innerElementType = (p: State) =>
  forwardRef<any>(
    ({ children, ...rest }, ref) =>
      <div ref={ref} {...rest}>
        {p.stickyIndices.map(index =>
          <StickyRow index={index} key={index} style={{ top: index * p.itemSize, left: 0, width: "100%", height: p.itemSize }} />
        )}
        {children}
      </div>
  );

const StickyList = (p: State) =>
  <List
    height={150}
    innerElementType={innerElementType(p)}
    itemCount={1000}
    itemSize={35}
    width={300}>
    {ip => p.stickyIndices.includes(ip.index) ? null : <Row {...ip} />}
  </List>;


export const ExFixed = () =>
  <StickyList stickyIndices={[0, 1]} itemSize={35} />

