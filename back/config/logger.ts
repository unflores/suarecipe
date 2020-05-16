import * as bunyan from 'bunyan'

const logger = bunyan.createLogger({
  name: 'suarecipe',
})

export { logger }
