const webpack = require('webpack');
const path    = require('path');

const APP_DIR   = path.resolve(__dirname, 'front/app');

const config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: path.resolve(__dirname, 'front/assets/js'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: { frontapp: path.resolve(__dirname, 'front/app') },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.css$/, loader: 'style-loader'},
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: ['node_modules'],
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
            'react',
            'stage-2'
          ]
        }
      }
    ]
  },
};

module.exports = config;

