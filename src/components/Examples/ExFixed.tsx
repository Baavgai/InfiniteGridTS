import React, { createContext, forwardRef } from "react";
import { FixedSizeList as List, FixedSizeListProps } from "react-window";
import { AppProps } from "../../types";


interface Data {
  stickyIndices: number[];
  ItemRenderer: any;
}
interface ItemRendererProps {
  index: number;
  style: React.CSSProperties;
}

const StickyListContext = createContext<Data>({ stickyIndices: [], ItemRenderer: undefined });

StickyListContext.displayName = "StickyListContext";

interface StickyListProps extends FixedSizeListProps {
  children: any;
  stickyIndices: number[];
}

const ItemWrapper = ({ data, index, style }: ItemRendererProps & { data: Data }) => {
  console.log({fn: "ItemWrapper", data, index, style})
  const { ItemRenderer, stickyIndices } = data;
  if (stickyIndices && stickyIndices.includes(index)) {
    return null;
  }
  return <ItemRenderer index={index} style={style} />;
};

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

const innerElementType = forwardRef<any>(({ children, ...rest }, ref) => (
  <StickyListContext.Consumer>
    {({ stickyIndices }) => (
      <div ref={ref} {...rest}>
        {stickyIndices.map(index => (
          <StickyRow
            index={index}
            key={index}
            style={{ top: index * 35, left: 0, width: "100%", height: 35 }}
          />
        ))}

        {children}
      </div>
    )}
  </StickyListContext.Consumer>
));

const StickyList = ({ children, stickyIndices, ...rest }: StickyListProps) =>
  <StickyListContext.Provider value={{ ItemRenderer: children, stickyIndices }}>
    <List itemData={{ ItemRenderer: children, stickyIndices }} {...rest}>
      {ItemWrapper}
    </List>
  </StickyListContext.Provider>;


export const ExampleComponent = (ap: AppProps) =>
  <StickyList
    height={ap.height}
    innerElementType={innerElementType}
    itemCount={1000}
    itemSize={35}
    stickyIndices={[0, 1]}
    width={300}
  >
    {Row}
  </StickyList>;


export const ExampleName = "Sticky list head";

/*
import React, { createContext, forwardRef, useContext } from "react";
import { render } from "react-dom";
import "./styles.css";
import { FixedSizeList as List } from "react-window";

const StickyListContext = createContext();
StickyListContext.displayName = "StickyListContext";

const ItemWrapper = ({ data, index, style }) => {
  const { ItemRenderer, stickyIndices } = data;
  if (stickyIndices && stickyIndices.includes(index)) {
    return null;
  }
  return <ItemRenderer index={index} style={style} />;
};

const Row = ({ index, style }) => (
  <div className="row" style={style}>
    Row {index}
  </div>
);

const StickyRow = ({ index, style }) => (
  <div className="sticky" style={style}>
    Sticky Row {index}
  </div>
);

const innerElementType = forwardRef(({ children, ...rest }, ref) => (
  <StickyListContext.Consumer>
    {({ stickyIndices }) => (
      <div ref={ref} {...rest}>
        {stickyIndices.map(index => (
          <StickyRow
            index={index}
            key={index}
            style={{ top: index * 35, left: 0, width: "100%", height: 35 }}
          />
        ))}

        {children}
      </div>
    )}
  </StickyListContext.Consumer>
));

const StickyList = ({ children, stickyIndices, ...rest }) => (
  <StickyListContext.Provider value={{ ItemRenderer: children, stickyIndices }}>
    <List itemData={{ ItemRenderer: children, stickyIndices }} {...rest}>
      {ItemWrapper}
    </List>
  </StickyListContext.Provider>
);

const rootElement = document.getElementById("root");
render(
  <StickyList
    height={150}
    innerElementType={innerElementType}
    itemCount={1000}
    itemSize={35}
    stickyIndices={[0, 1]}
    width={300}
  >
    {Row}
  </StickyList>,
  rootElement
);

*/
