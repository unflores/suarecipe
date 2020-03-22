import logger from './config/logger'
import app from './src/server'
import { dbSetup } from './config/mongoose'

const port = process.env.PORT || '9090'
dbSetup()

app.listen(port)
logger.info(`I see you on ${port}`)
