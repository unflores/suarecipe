const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/\_\_tests\_\_/, path.resolve('../app/setupEnzyme.ts')],
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
        exclude: [/\_\_tests\_\_/, path.resolve('../app/setupEnzyme.ts')],
        options: {
          configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
        },
      },
    ],
  },
})
