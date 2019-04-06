import "intersection-observer";
import { storiesOf } from "@storybook/react";
import React from "react";
import { withDocs } from "storybook-readme";

import MasonryLayout from "./BootstrapCards";
import "./bootstrap.css";
import "./style.css";

import readme from "./BootstrapCards.md";

storiesOf("FastMasonry", module)
  .addDecorator(withDocs(readme))
  .add("Masonry layout with bootstrap card components", () => {
    return <MasonryLayout />;
  });
