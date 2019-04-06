# Masonry Layout with Card Components

Below is an example of a masonry layout.

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
import MasonryInfiniteScroller from "../FastMasonry";
import Card from "react-bootstrap/Card";

export default class RandomMasonryCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.randomCardItems()
    };
  }

  randomCardItems = (n = 20) => {
    return new Array(n).fill(0).map(() => this.randomCardItem());
  };

  getCard = item => {
    return cards[item];
  };

  randomCardItem = () => {
    return this.randomInt(0, cards.length - 1);
  };

  randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  };

  loadMore = () => {
    this.setState(state => ({
      items: [...state.items, ...this.randomCardItems()]
    }));
  };

  renderItem = (index, key) => {
    const RandomCard = this.getCard(this.state.items[index]);
    return <RandomCard key={key} width={300} />;
  };

  render() {
    console.log(this.state.items);
    return (
      <div className="app">
        <MasonryInfiniteScroller
          items={this.state.items}
          renderItem={this.renderItem}
          loadMore={this.loadMore}
          awaitMore={true}
          pageSize={20}
          className="masonry"
        />
      </div>
    );
  }
}

////// ignore this just random card render functions
const cards = [
  // redacted
];
```

<!-- STORY -->
