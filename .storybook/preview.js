const { configure, addDecorator } = require("@storybook/react");
const { setOptions } = require("@storybook/addon-options");
const packageSettings = require("../package.json");
const { addReadme } = require('storybook-readme');

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

const req = require.context("../src", true, /.+\.stories\.tsx?/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(addReadme);

configure(loadStories, module);
