const Bluebird = require('bluebird')
const stat = Bluebird.promisify(require('fs').stat)
const readdir = Bluebird.promisify(require('fs').readdir)
const path = require('path')
const fs = require('fs')

const ensureDistDirExists = (srcBase, srcPath, dest) => {
  return new Bluebird((resolve, reject) => {
    const destPath = path.join(dest, srcPath)
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath)
    }
    resolve({ srcBase, srcPath, dest })
  })
}

const copyChildrenFiles = ({ srcBase, srcPath, dest }) => {
  const src = path.join(srcBase, srcPath)
  return new Bluebird((resolve, reject) => {
    readdir(src).then((dir) => {
      const filePromises = dir.map((file) => {
        const newSrcPath = path.join(srcPath, file)

        return copyRecursive(srcBase, newSrcPath, dest).catch((err) =>
          console.log(err),
        )
      })
      Bluebird.all(filePromises).then((promises) => resolve())
    })
  })
}

/**
 * Copy over static files given an entry point source
 * @srcBase String The base directory to work from
 * @srcPath String The entry point to start copying from
 * @dest String The entrypoint of the destination to copy
 *
 **/
const copyRecursive = function(srcBase, srcPath, dest) {
  const src = path.join(srcBase, srcPath)
  return new Bluebird((resolve, reject) => {
    if (!fs.existsSync(src)) {
      return reject(new Error(`Error: The entry point '${src}' doesn't exist.`))
    }
    stat(src).then((fileStat) => {
      if (fileStat.isDirectory()) {
        ensureDistDirExists(srcBase, srcPath, dest)
          .then(copyChildrenFiles)
          .then(() => resolve())
          .catch((err) => reject(err))
      } else if (fileStat.isFile()) {
        if (srcPath.search(/\.tsx?$/) === -1) {
          const source = path.resolve(srcBase, srcPath)
          const destination = path.resolve(dest, srcPath)
          console.log(`copying : ${source} to ${destination}`)
          try {
            fs.copyFileSync(
              source,
              destination,
            )
          } catch (err) {
            console.log(err)
          }
        }
        resolve()
      }
    })
  })
}

module.exports = {
  copyStatic: copyRecursive,
}

if (require.main === module) {
  const [baseDir, entryPoint, destination] = process.argv.slice(2)
  copyRecursive(baseDir, entryPoint, destination)
    .then(() => {
      process.exit()
    })
    .catch((err) => {
      console.log(err)
      process.exit()
    })
}
