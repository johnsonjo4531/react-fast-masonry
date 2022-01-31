import "intersection-observer";
import { storiesOf } from "@storybook/react";
import React from "react";
import { withDocs } from "storybook-readme";

import MasonryLayout from "./SimpleMasonry";
import readme from "./SimpleMasonry.md";

storiesOf("FastMasonry", module)
  .addParameters({
    readme: {
      // Show readme before story
      // content: readme,
      // Show readme at the addons panel
      sidebar: readme,
    },
  })
  .add("Simple masonry layout", () => {
    return <MasonryLayout />;
  });
