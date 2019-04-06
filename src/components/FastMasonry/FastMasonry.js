// started from react-masonry-infinite

import React, { Component } from "react";
import PropTypes from "prop-types";
import Bricks from "bricks.js";
import List from "@researchgate/react-intersection-list";

export default class MasonryInfiniteScroller extends Component {
	constructor(props) {
		super(props);
		// this.masonryContainer = React.createRef();
		this.listComponent = React.createRef();
	}

	static propTypes = {
		items: PropTypes.array.isRequired,
		renderItem: PropTypes.func.isRequired,
		loadMore: PropTypes.func.isRequired,
		onIntersection: PropTypes.func,
		awaitMore: PropTypes.bool,
		className: PropTypes.string,
		pack: PropTypes.bool,
		packed: PropTypes.string,
		position: PropTypes.bool,
		sizes: PropTypes.array,
		style: PropTypes.object
	};

	static defaultProps = {
		axis: "y",
		initialIndex: 0,
		pageSize: 10,
		threshold: "100px",
		className: "",
		pack: false,
		packed: "data-packed",
		position: true,
		sizes: [
			{ columns: 1, gutter: 20 },
			{ mq: "768px", columns: 2, gutter: 20 },
			{ mq: "1024px", columns: 3, gutter: 20 }
		],
		style: {}
	};

	componentDidMount() {
		this.handleSentinel();
		this.createNewInstance();
	}

	handleSentinel() {
		if (this.masonryContainer) {
			// bricks.js sizes the container based off the last elements width
			this.masonryContainer.lastChild.style.width = this.masonryContainer.firstChild.style.width;
			// we must unpack the sentinel or it will not be repositioned.
			this.masonryContainer.lastChild.removeAttribute(this.props.packed);
		}
	}

	componentDidUpdate(prevProps) {
		const { items } = this.props;
		const { instance } = this.state;

		this.handleSentinel();

		if (prevProps.items.length === 0 && items.length === 0) {
			return;
		}

		if (prevProps.items.length === 0 && items.length > 0) {
			return instance.pack();
		}

		if (prevProps.items.length !== items.length) {
			if (this.props.pack) {
				return instance.pack();
			} else {
				return instance.update();
			}
		}
	}

	componentWillUnmount() {
		if (this.state) {
			this.state.instance.resize(false);
		}
	}

	setContainerRef = ref => component => {
		this.masonryContainer = component;
		return ref(component);
	};

	forcePack = () => {
		if (this.masonryContainer) {
			this.state.instance.pack();
		}
	};

	forceUpdate = () => {
		if (this.masonryContainer) {
			this.state.instance.update();
		}
	};

	createNewInstance = () => {
		const { packed, sizes, items, position } = this.props;
		const instance = Bricks({
			container: this.masonryContainer,
			packed: packed,
			sizes: sizes,
			position: position
		});

		instance.resize(true);

		if (items.length > 0) {
			instance.pack();
		}

		this.setState(() => ({ instance }));
	};

	itemsRenderer = (items, ref) => {
		const { className, style } = this.props;
		return (
			<div ref={this.setContainerRef(ref)} className={className} style={style}>
				{items}
			</div>
		);
	};

	onIntersection = (...args) => {
		this.props.onIntersection && this.props.onIntersection(...args);
		if (
			this.listComponent &&
			this.listComponent.current &&
			this.listComponent.current.state &&
			this.listComponent.current.state.size >= this.props.items.length
		) {
			return this.props.loadMore();
		} else {
			this.forcePack();
		}
	};

	render() {
		const {
			className,
			style,
			pack,
			packed,
			position,
			sizes,
			itemsRenderer,
			onIntersection,
			...props
		} = this.props;

		return (
			<List
				ref={this.listComponent}
				itemsRenderer={this.itemsRenderer}
				onIntersection={this.onIntersection}
				{...props}
			/>
		);
	}
}
