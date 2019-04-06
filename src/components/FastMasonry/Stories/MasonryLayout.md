# Dynamic width items

Using dynamic width items creates jank. This tends to not look so good. Make your browser window large scroll down then resize your browser window smaller and scroll back up.

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
		return cards[item.cardIdx];
	};

	randomCardItem = () => {
		return {
			cardIdx: this.randomInt(0, cards.length - 1),
			loaded: false
		};
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
		const item = this.state.items[index];
		const RandomCard = this.getCard(item);
		console.log(item.loaded);
		return <RandomCard width={300} />;
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
					pageSize={this.state.items.length}
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
