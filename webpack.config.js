const webpack = require('webpack');
const path    = require('path');

const APP_DIR   = path.resolve(__dirname, 'front/app');

const config = {
  entry: APP_DIR + '/index.tsx',
  output: {
    path: path.resolve(__dirname, 'front/assets/js/'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    alias: { frontapp: path.resolve(__dirname, 'front/app') },
    extensions: ['.js', '.jsx', 'xts', '.tsx']
  },
  module: {
    rules: [
      { test: /\.css$/, loader: 'style-loader'},
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      { enforce: "pre", test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
  },
};

module.exports = config;

