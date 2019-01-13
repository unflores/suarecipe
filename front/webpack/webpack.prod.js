const merge = require('webpack-merge')
const common = require('./webpack.common.js')
console.log('TESTING HERP DERP. LARK MARK. CLARK.')
module.exports = merge(common, {
  mode: 'production',
})
