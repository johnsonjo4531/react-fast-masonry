# react-fast-masonry

A react masonry library featuring infinite-scrolling capabilities using [bricks.js](http://callmecavs.com/bricks.js/) and [react-intersection list](https://github.com/researchgate/react-intersection-list). It's based off [react-masonry-infinite](https://github.com/skoob13/react-masonry-infinite), but uses react-intersection-list instead of react-infinite-scroll for faster infinite scrolling.

Since it's based on bricks.js you will need to set all of your items within the masonry container to be the same width. What makes this different then bricks.js is it allows container-queries on it's sizing options rather than media queries. It also allows you to set custom widths at those container query breakpoints.

## Installing

```sh
npm i --save react-fast-masonry
```

## Usage

First import the library `react-fast-masonry`

```jsx
import MasonryLayout from "react-fast-masonry";
```

Then use it like so.

```jsx
<MasonryLayout
  // This is a required prop this defines how wide your gutters and columns are (required) and optionally provides a way to  define your column-width (columnWidth) and container-queries (cq)
  sizes={[
    { columns: 1, gutter: 0, columnWidth: "100%" },
    { cq: 768, columns: 2, gutter: 20, columnWidth: 300 },
    { cq: 1024, columns: 3, gutter: 20, columnWidth: 400 }
  ]}
  items={this.state.items}
  // The columnWidth here comes from the sizes prop up above
  renderItem={({ columnWidth }, index: number, key: any) => (
    <div
      style={{
        width: columnWidth
      }}
      key={key}
    >
      {index}
    </div>
  )}
  loadMore={this.loadMore}
  awaitMore={true}
  pageSize={20}
  className="masonry"
/>
```

A full fledged example of the above might is given as the Simple masonry layout in the [storybook](https://johnsonjo4531.github.io/react-fast-masonry/?selectedKind=FastMasonry&selectedStory=Simple%20masonry%20layout&full=0&addons=0&stories=1&panelRight=0).
