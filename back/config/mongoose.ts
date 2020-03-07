import * as bluebird from 'bluebird'
import mongoose = require('mongoose')
import logger from './logger'
const env = process.env.NODE_ENV

interface IConfig {
  url?: string
}

const config: IConfig = {}

switch (env) {
  case 'development':
    config.url = 'mongodb://127.0.0.1:27017/planOtterPOC_development'
    break
  case 'test':
    config.url = 'mongodb://127.0.0.1:27017/planOtterPOC_test'
    break
  case 'production':
    config.url = process.env.MONGODB_URI
    break
  default:
    logger.fatal('Missing env!')
    process.exit()
}
mongoose.set('debug', true)
mongoose.Promise = bluebird

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to ${config.url}`)
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error(`Mongoose default connection error: ${err}`)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info(`Mongoose default connection disconnected`)
})

export default (cb?: () => void) => {
  mongoose.connect(
    config.url,
    cb,
  )
  return mongoose
}
