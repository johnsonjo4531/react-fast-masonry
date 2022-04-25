import { storiesOf } from "@storybook/react";

import MasonryLayout from "./ReverseInfinite";
import readme from "./ReverseInfinite.md";

storiesOf("FastMasonry", module)
  .addParameters({
    readme: {
      // Show readme before story
      // content: readme,
      // Show readme at the addons panel
      sidebar: readme
    }
  })
  .add("ReverseInfinite", () => <MasonryLayout />);
