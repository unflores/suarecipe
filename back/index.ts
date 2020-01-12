import cookieParser = require('cookie-parser')
import express = require('express')
import * as path from 'path'
import logger from './config/logger'
import mongoose from './config/mongoose'
import * as dotenv from 'dotenv'
import buildRoutes from './src/router'
dotenv.config()

// Middleware
// Logger
// Parses Html Body
import bodyParser = require('body-parser')
// Simulate DELETE and PUT
import methodOverride = require('method-override')
import morgan = require('morgan')

const app = express()
const baseDir =
  process.env.NODE_ENV === 'production'
    ? path.resolve('/app/back/dist/')
    : path.resolve(__dirname)
// TODO wtf was I thinking here?
mongoose(() => ({}))

// Middleware Setup
app.use('/assets/', express.static(path.resolve(baseDir, 'assets'))) // Set location of static data
// If we didn't find it in assets, send a 404
app.use('/assets/', (req, res) => {
  res.status(404).send('Not Found')
})

app.use(morgan('dev')) // Log requests to console
app.use(bodyParser.urlencoded({ extended: 'true' })) // Parse extended utf urls
app.use(cookieParser()) // Read cookies for auth
app.use(bodyParser.json()) // Parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) // Parse incoming data as json
app.use(methodOverride())

buildRoutes(app)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(baseDir, 'index.html'))
})

const port = process.env.PORT || '9090'
app.listen(port, '0.0.0.0')
logger.info(`I see you on ${port}`)
