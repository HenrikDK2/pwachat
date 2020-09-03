const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  filenameHashing: false,
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            sourceMap: false,
            comments: false,
            compress: {
              warnings: process.env.WEBPACK_MODE == "production" ? false : true,
              pure_getters: true,
              unsafe: true,
              unsafe_comps: true,
              ie8: false,
              conditionals: true,
              unused: true,
              comparisons: true,
              sequences: true,
              drop_console: process.env.WEBPACK_MODE == "production" ? true : false,
              dead_code: true,
              evaluate: true,
              if_return: true,
              join_vars: true,
            },
          },
        }),
      ],
    },
  },
};
