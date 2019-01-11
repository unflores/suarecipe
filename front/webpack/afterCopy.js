'use strict'
const Bluebird = require('bluebird')
const exec = require('child_process').exec
const path = require('path')
const copyFile = Bluebird.promisify(require('fs').copyFile)
const fs = require('fs')
const copyStatic = require('../../back/copyStatic').copyStatic

function puts(error, stdout, stderr) {
  console.log(stdout)
}

function AfterCopy(options) {
  const defaultOptions = {
    onBuildEndCopy: [],
    destination: '',
  }

  this.options = Object.assign(defaultOptions, options)
}

AfterCopy.prototype.apply = function(compiler) {
  const options = this.options

  compiler.plugin('emit', (compilation) => {
    const { files, directories } = options
    files.forEach((file) => {
      const { base, name, destination } = file
      copyFile(path.resolve(base, name), path.resolve(destination, name))
        .then((stuff) => console.log(stuff))
        .catch((err) => console.log(err))
    })
    directories.forEach((directory) => {
      const { base, entryPoint, destination } = directory
      copyStatic(base, entryPoint, destination)
        .then(() => ({}))
        .then((err) => console.log(err))
    })
  })
}

module.exports = AfterCopy
