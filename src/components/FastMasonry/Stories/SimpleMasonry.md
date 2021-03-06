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
import "intersection-observer";
import React from "react";
import MasonryLayout from "react-fast-masonry";

export default class MyMasonry extends React.Component {
  static defaultStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
  };

  static colors = [
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

  state = {
    items: []
  };

  randomItems = (n = 20) => {
    return new Array(n).fill(0).map(() => ({
      width: 300,
      height: this.randomInt(100, 1000),
      backgroundColor:
        MyMasonry.colors[this.randomInt(0, MyMasonry.colors.length - 1)]
    }));
  };

  randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  };

  loadMore = () => {
    this.setState(state => ({
      items: [...state.items, ...this.randomItems()]
    }));
  };

  // `this` must be bound to the render item function in order to use it.
  renderItem = (index, key) => {
    return (
      <div
        style={{
          ...this.state.items[index],
          ...MyMasonry.defaultStyles
        }}
      >
        {index}
      </div>
    );
  };

  render() {
    return (
      <MasonryLayout
        items={this.state.items}
        renderItem={this.renderItem}
        loadMore={this.loadMore}
        awaitMore={true}
        pageSize={20}
        className="masonry"
      />
    );
  }
}
```

<!-- STORY -->
