import * as bluebird from 'bluebird'
import mongoose = require('mongoose')
import { logger } from './logger'
const env = process.env.NODE_ENV

let url: string

switch (env) {
  case 'development':
    url = 'mongodb://dev:dev@mongo:27017/suarecipe_development'
    break
  case 'test':
    url = 'mongodb://dev:dev@mongo:27017/suarecipe_test'
    break
  case 'production':
    url = process.env.MONGODB_URI
    break
  default:
    logger.fatal(`Missing env for '${env}'!`)
    process.exit()
}
if (env !== 'test') {
  mongoose.set('debug', true)
}

mongoose.Promise = bluebird

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to ${url}`)
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error(`Mongoose default connection error: ${err}`)
})

let connection

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info(`Mongoose default connection disconnected`)
})

export const dbSetup = async () => {
  if (connection) {
    return
  }

  connection = await mongoose.connect(url, { useNewUrlParser: true })
}

export const dbClose = async () => {

  await mongoose.connection.close()
}

export default mongoose
