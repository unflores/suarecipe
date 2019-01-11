const path = require('path')
const afterCopy = require('./afterCopy')

const APP_DIR = path.resolve(__dirname, '..', 'app')
const DIST_DIR = path.resolve(__dirname, '..', 'assets')

module.exports = {
  plugins: [
    new afterCopy({
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
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: path.resolve(__dirname, '..', 'tslint.json'),
          tsConfigFile: path.resolve(__dirname, '..', 'tsconfig.json'),
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /\_\_tests\_\_/,
        options: {
          configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
        },
      },

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
