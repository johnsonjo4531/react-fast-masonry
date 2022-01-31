import { configure, addDecorator } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
const packageSettings = require("../package.json");
import { addReadme } from 'storybook-readme';

setOptions({
  name: "react-fast-masonry",
  url:
    (packageSettings &&
      packageSettings.repository &&
      packageSettings.repository.url) ||
    "",
  goFullScreen: false,
  showDownPanel: false,
  downPanelInRight: false
});

const req = require.context("../src", true, /.+\.stories\.js/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(addReadme);

configure(loadStories, module);
