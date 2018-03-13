
const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: "./src/index.js", 
  output: {
    path: path.resolve(__dirname, "dist"), 
    filename: "bundle.js", 
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: '$'
        }]
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src/app"),
          path.resolve(__dirname, "src/assets")
        ],
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        },
        // options for the loader
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ],
  },
  stats: "errors-only",
  plugins: [
    // ...
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": "jquery",
      underscore: "underscore"
    }),
     new ExtractTextPlugin({filename: "styleBundle.css"})
  ],
}