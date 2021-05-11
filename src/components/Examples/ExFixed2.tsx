import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";
import { AppProps } from "../../types";

interface ItemRendererProps {
  index: number;
  style: React.CSSProperties;
}

interface State {
  header: string;
  itemSize: number;
}

const Row = ({ index, style }: ItemRendererProps) => (
  <div className="nonstick" style={style}>
    Row {index}
  </div>
);


const Header = (p: State) => (
  <div className="sticky" style={{ top: 0 * p.itemSize, left: 0, width: "100%", height: p.itemSize }}>
    {p.header}
  </div>
);

const innerElementType = (p: State) =>
  forwardRef<any>(
    ({ children, ...rest }, ref) => {
      console.log({rest})
      return <div ref={ref} {...rest}><Header {...p} />{children}</div>
    }

  );

const StickyList = (p: State & AppProps) =>
  <List
    height={p.height}
    innerElementType={innerElementType(p)}
    itemCount={1000}
    itemSize={35}
    width={300}>
    {ip => ip.index === 0 ? null : <Row {...ip} index={ip.index - 1} />}
  </List>;


export const ExampleComponent = (p: AppProps) =>
  <StickyList {...p} header="test" itemSize={35} />


export const ExampleName = "Sticky fixed head";


/*
const Header = (p: State) => (
  <div className="sticky" style={{ top: 0 * p.itemSize, left: 0, width: "100%", height: p.itemSize }}>
    {p.header}
  </div>
);
const innerElementType = (p: State) =>
  forwardRef<any>(
    ({ children, ...rest }, ref) =>
      <div ref={ref} {...rest}>
        <Header {...p} />
        {children}
      </div>
  );

*/