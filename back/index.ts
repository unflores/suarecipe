import logger from './config/logger'
import app from './src/server'

const port = process.env.PORT || '9090'
app.listen(port, '0.0.0.0')
logger.info(`I see you on ${port}`)
