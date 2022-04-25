import React, { useLayoutEffect, useRef } from "react";
import MasonryLayout from "../../../index";

const defaultStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "24px",
  fontWeight: "bold",
  fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`
};

const colors = [
  "cornflowerblue",
  "tomato",
  "steelblue",
  "slategrey",
  "turquoise",
  "teal",
  "darkcyan",
  "darkseagreen",
  "coral"
];

const randomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomItems = (n = 20) =>
  new Array(n).fill(0).map(() => ({
    width: 300,
    height: randomInt(100, 1000),
    backgroundColor: colors[randomInt(0, colors.length - 1)]
  }));

const concatRandomItems = (
  items: any[],
  type: "prepend" | "append" = "append"
) => {
  const randomItemList = randomItems();
  return type === "append"
    ? [...items, ...randomItemList]
    : [...randomItemList, ...items];
};

function closestScrollArea(
  element: Element | null | ParentNode
): HTMLElement | null {
  if (
    element instanceof HTMLElement &&
    element.scroll &&
    element.scrollHeight > 0
  ) {
    return element;
  }
  return element?.parentNode ? closestScrollArea(element.parentNode) : null;
}

export default function MyMasonry() {
  const container = useRef<HTMLDivElement | undefined>(undefined);
  const [items, setItems] = React.useState([] as any[]);
  const [scrollTarget, setScrollTarget] = React.useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    setTimeout(() => {
      console.log({ scrollTarget });
      scrollTarget?.scrollIntoView(true);
    }, 10);
  }, [items]);

  return (
    <div
      ref={r => {
        if (!r) return;
        container.current = r;
      }}
      style={{
        transform: `rotate(180deg)`
      }}
    >
      <MasonryLayout
        pack={true}
        sizes={[
          { columns: 1, gutter: 0, columnWidth: "100%" },
          { cq: 768, columns: 2, gutter: 20, columnWidth: 300 },
          { cq: 1024, columns: 3, gutter: 20, columnWidth: 400 }
        ]}
        items={items}
        renderItem={({ columnWidth }, index: number, key: any) => (
          <div
            style={{
              transform: `rotate(-180deg)`,
              ...items[index],
              ...defaultStyles,
              width: columnWidth
            }}
            key={key}
          >
            {index}
          </div>
        )}
        loadMore={() => {
          if (!container.current) return;
          const masonryEl = container.current.querySelector(".masonry");
          let scrollTarget2 = masonryEl?.lastChild;
          // Get the last HTMLElement (this will grab the sentinel)
          while (!(scrollTarget2 instanceof HTMLElement)) {
            scrollTarget2 = scrollTarget2?.previousSibling;
          }
          // Get the last HTMLElement besides the sentinel.
          scrollTarget2 = scrollTarget2?.previousSibling;
          while (!(scrollTarget2 instanceof HTMLElement)) {
            scrollTarget2 = scrollTarget2?.previousSibling;
          }
          if (scrollTarget2) {
            setScrollTarget(scrollTarget2);
            console.log({ scrollTarget2 });
          }
          setItems([...items, ...randomItems()]);
        }}
        awaitMore={true}
        pageSize={20}
        className="masonry"
      />
    </div>
  );
}
