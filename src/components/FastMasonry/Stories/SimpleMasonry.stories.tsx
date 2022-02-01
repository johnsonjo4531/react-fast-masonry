import { storiesOf } from "@storybook/react";

import MasonryLayout from "./SimpleMasonry";
import readme from "./SimpleMasonry.md";

storiesOf("FastMasonry", module)
  .addParameters({
    readme: {
      // Show readme before story
      // content: readme,
      // Show readme at the addons panel
      sidebar: readme
    }
  })
  .add("Simple masonry layout", () => <MasonryLayout />);
