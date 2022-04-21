# Simple Masonry Layout

Below is a simple example of a masonry layout.

```css
.masonry {
  margin: 0 auto;
}

.masonry > * {
  width: 300px;
}
```

```jsx
import React from "react";
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

export default function MyMasonry() {
  const [items, setItems] = React.useState([] as any[]);

  return (
    <div>
      <MasonryLayout
        sizes={[
          { columns: 1, gutter: 0, columnWidth: "100%" },
          { cq: 768, columns: 2, gutter: 20, columnWidth: 300 },
          { cq: 1024, columns: 3, gutter: 20, columnWidth: 400 }
        ]}
        items={items}
        renderItem={({ columnWidth }, index: number, key: any) => (
          <div
            style={{
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
          setItems([...items, ...randomItems()]);
        }}
        awaitMore={true}
        pageSize={20}
        className="masonry"
      />
    </div>
  );
}

```

<!-- STORY -->
