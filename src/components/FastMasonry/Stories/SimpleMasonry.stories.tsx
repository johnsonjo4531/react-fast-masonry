import "intersection-observer";
import { storiesOf } from "@storybook/react";
import React from "react";
import { withDocs } from "storybook-readme";

import MasonryLayout from "./SimpleMasonry";
import readme from "./SimpleMasonry.md";

storiesOf("FastMasonry", module)
  .addDecorator(withDocs(readme))
  .add("Simple masonry layout", () => {
    return <MasonryLayout />;
  });
