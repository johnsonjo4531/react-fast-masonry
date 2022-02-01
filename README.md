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

````

## Examples & Documentation

Checkout the [storybook](https://johnsonjo4531.github.io/react-fast-masonry/) or this [codesandbox.io](https://codesandbox.io/s/n9mpn054jl)!

## Contributing

See below details to see how the Yeoman generator `generator-react-exhibit` setup this project and which may give you possible tips for contributing

### Tech Stack

| frontend      |                                                                  |
| ------------- | ---------------------------------------------------------------- |
| view library  | [react](https://reactjs.org/)                                    |
| boilerplate   | [create-react-app](https://github.com/facebook/create-react-app) |
| documentation | [storybook](https://github.com/storybooks/storybook)             |

### Getting started

You can use [generator-react-exhibit](generator-react-exhibit) to build your library. Simply run:

```sh
yo react-exhibit my-library
````

To view your library in action run:

```sh
cd my-library
npm start
```

You can now open http://localhost:9009/ and view your component documentation.

To include a component in the storybook, simply add a `<componentName>.stories.js` file in your
component folder, containing the stories you want to show. Have a look at the `Button` component for
an example.

### Scripts

A set of scripts are provided for you to test, build and analyze the project. Have a look at [create react app](https://github.com/facebook/create-react-app) for more information.

#### Test

You can run all tests in the project with the following command:

```sh
npm run test
```

You can also generate a website with information on the code coverage with:

```sh
npm run test -- --coverage
```

This will generate a website in the folder `coverage`. You can launch it with any server of your
choice, for example [serve](https://www.npmjs.com/package/serve).

```sh
npm i -g serve && serve coverage
```

#### Build

You can build a production ready version of your library by running:

```sh
npm run build
```

This will create a build folder containing your library.

You can also build a production ready version of your documentation by running:

```sh
npm run build:storybook
```

This will create a folder called `storybook-static` with your documentation.

#### Deploy

After building your documentation, you can deploy it as a gh-page.
Make sure to add a homepage entry in your `package.json` like so:

```json
{
  "homepage": "https://my-github-name.github.io/my-library/"
}
```

Then simply run:

```sh
npm run deploy
```

You can also publish your library to `npm`. To do that, simply run:

```sh
npm publish
```

#### Dependency map

You can generate a map of all dependencies, this can be very usefull when trying to identify a
library causing bloat to the application. After building your application you can generate a map,
by running:

```sh
npm run analyze
```

This will look into your `build` folder and open an interactive map of the dependencies in your
browser.

### Adding typescript

Typescript support was added to `react-scripts@2.1.0`. To activate it, run:

```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

### License

[MIT](https://github.com/au-re/fresh-start/blob/master/LICENSE)
