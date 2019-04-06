import "intersection-observer";
import { storiesOf } from "@storybook/react";
import React from "react";
import { withDocs } from "storybook-readme";

import MasonryLayout from "./MasonryLayout";
import "./bootstrap.css";
import "./style.css";

import readme from "./MasonryLayout.md";

storiesOf("FastMasonry", module)
	.addDecorator(withDocs(readme))
	.add("Masonry Layout", () => {
		return <MasonryLayout />;
	});
