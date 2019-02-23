const webpack = require("webpack");
module.exports = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        ENDPOINT_SEND: JSON.stringify(process.env.ENDPOINT_SEND)
      })
    );
    return config;
  }
};
