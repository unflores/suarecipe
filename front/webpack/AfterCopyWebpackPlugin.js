'use strict'
const Bluebird = require('bluebird')
const exec = require('child_process').exec
const path = require('path')
const copyFile = Bluebird.promisify(require('fs').copyFile)
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
        copyFile(
          path.resolve(base, name),
          path.resolve(destination, name),
        ).catch((err) => console.log(err))
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
