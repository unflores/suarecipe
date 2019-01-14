const path = require('path')
const AfterCopyWebpackPlugin = require('./AfterCopyWebpackPlugin.js')

const APP_DIR = path.resolve(__dirname, '..', 'app')
const DIST_DIR = path.resolve(__dirname, '..', 'assets')

module.exports = {
  plugins: [
    new AfterCopyWebpackPlugin({
      files: [
        { base: './', name: './index.html', destination: '../back/dist/' },
      ],
      directories: [
        {
          base: './',
          entryPoint: 'assets',
          destination: '../back/dist',
        },
      ],
    }),
  ],
  entry: { main: APP_DIR + '/index.tsx' },
  output: {
    path: path.resolve(DIST_DIR, 'js'),
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    alias: { frontapp: APP_DIR },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },

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
              camelCase: true,
            },
          },
        ],
      },
    ],
  },
}
