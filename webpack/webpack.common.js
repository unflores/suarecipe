const path = require('path')

const APP_DIR   = path.resolve(__dirname, '..', 'front/app')
const DIST_DIR  = path.resolve(__dirname, '..', 'front/assets/')

module.exports = {
  entry: { 'main': APP_DIR + '/index.tsx'},
  output: {
    path: path.resolve(DIST_DIR, 'js'),
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    alias: { frontapp: APP_DIR },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, enforce: "pre", loader: 'tslint-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /\_\_tests\_\_/},

      { test: /\.js$/, enforce: "pre", loader: 'source-map-loader' },

      {
        test: /\.css$/,
        include: APP_DIR,
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true
            }
          }
        ]
      }
    ]
  }
}
