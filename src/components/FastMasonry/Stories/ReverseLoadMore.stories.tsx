import { storiesOf } from "@storybook/react";

import MasonryLayout from "./ReverseLoadMore";
import readme from "./ReverseLoadMore.md";

storiesOf("FastMasonry", module)
  .addParameters({
    readme: {
      // Show readme before story
      // content: readme,
      // Show readme at the addons panel
      sidebar: readme
    }
  })
  .add("ReverseLoadMore", () => <MasonryLayout />);
