import * as dotenv from 'dotenv'
dotenv.config()

import cookieParser = require('cookie-parser')
import * as express from 'express'
require('express-async-errors')
import * as path from 'path'
import buildRoutes from './router'
import handleExceptions from './exceptionHandler'

import * as bodyParser from 'body-parser'
// Simulate DELETE and PUT
import methodOverride = require('method-override')
import * as morgan from 'morgan'

const app = express()
const baseDir =
  process.env.NODE_ENV === 'production'
    ? path.resolve('/app/back/dist/')
    : path.resolve(__dirname, "../../")

// Middleware Setup
app.use('/assets/', express.static(path.resolve(baseDir, 'assets'))) // Set ingredient of static data
// If we didn't find it in assets, send a 404
app.use('/assets/', (req, res) => {
  res.status(404).send('Not Found')
})

app.use(morgan('dev')) // Log requests to console
app.use(bodyParser.urlencoded({ extended: true })) // Parse extended utf urls
app.use(cookieParser()) // Read cookies for auth
app.use(bodyParser.json()) // Parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) // Parse incoming data as json
app.use(methodOverride())



buildRoutes(app)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(baseDir, 'index.html'))
})

handleExceptions(app)

export default app
