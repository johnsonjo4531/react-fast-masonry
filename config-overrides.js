const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const dependencies = Object.keys(require("./package.json").dependencies);

const libraryName = path.basename(process.env.npm_package_name);
const entryFile = "src/index.ts";
const outputFile = `${path.basename(process.env.npm_package_main)}`;
const outputDir = "build";

module.exports = {
  webpack: function override(config, env) {
  config.entry = { [libraryName]: path.resolve(entryFile) };

  config.output.library = libraryName;
  config.output.libraryTarget = "umd";
  config.output.filename = outputFile;
  config.output.path = path.resolve(__dirname, outputDir);

  config.optimization = {};
  config.externals = dependencies;

  config.plugins = [
    new MiniCssExtractPlugin({
      filename: "static/css/styles.css"
    })
  ];
  return config;
}
}
