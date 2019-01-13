'use strict'
const Bluebird = require('bluebird')
const exec = require('child_process').exec
const path = require('path')
const copyFile = Bluebird.promisify(require('fs').copyFile)
const writeFile = Bluebird.promisify(require('fs').writeFile)
const fs = require('fs')
const copyStatic = require('../../back/copyStatic').copyStatic

class AfterCopyWebpackPlugin {
  constructor(options) {
    const defaultOptions = {
      files: [],
      directories: [],
    }

    this.options = Object.assign(defaultOptions, options)
  }

  apply(compiler) {
    const options = this.options
    compiler.hooks.done.tap('AfterCopyWebpackPlugin', (compilation) => {
      const { files, directories } = options
      files.forEach((file) => {
        const { base, name, destination } = file
        const from = path.resolve(base, name)
        const to = path.resolve(destination, name)
        writeFile(
          path.resolve('../back/dist/derp'),
          `copying : ${from} to ${to}`,
        )
          .then((val) => {
            console.log(val)
          })
          .catch((err) => {
            console.log(err)
          })
        copyFile(from, to)
          .then(() => {
            console.log(`copying : ${from} to ${to}`)
          })
          .catch((err) => console.log(err))
      })
      directories.forEach((directory) => {
        const { base, entryPoint, destination } = directory
        copyStatic(base, entryPoint, destination).catch((err) =>
          console.log(err),
        )
      })
    })
  }
}

module.exports = AfterCopyWebpackPlugin
