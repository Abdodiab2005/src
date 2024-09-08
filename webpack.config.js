const path = require("path");

module.exports = {
  mode: "development",
  entry: "./profile/overview/script.js",
  output: {
    path: path.resolve(__dirname, "./profile/overview"),
    filename: "overviewBundled.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/, // This rule tells Webpack to look for .css files
        use: [
          "style-loader", // Injects CSS into the DOM
          "css-loader", // Resolves @import and url() in CSS files
        ],
      },
    ],
  },

  watch: true,
};
