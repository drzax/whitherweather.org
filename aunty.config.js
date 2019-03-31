const webpack = require("webpack");
module.exports = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        ENDPOINT_SEND: JSON.stringify(process.env.ENDPOINT_SEND),
        ENDPOINT_STORE: JSON.stringify(process.env.ENDPOINT_STORE)
      })
    );
    return config;
  },
  webpackDevServer: {
    proxy: {
      "/.netlify": {
        target: "http://localhost:9000",
        pathRewrite: { "^/.netlify/functions": "" }
      }
    }
  }
};
