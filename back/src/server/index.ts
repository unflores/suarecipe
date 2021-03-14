import * as dotenv from 'dotenv'
dotenv.config()
import * as basicAuth from 'express-basic-auth'

import * as cookieParser from 'cookie-parser'
import * as express from 'express'
// tslint:disable no-var-requires
require('express-async-errors')
import * as path from 'path'
import { errorHandler } from './errorHandler'
import { router as adminRouter } from './routers/admin'
import { router as bookRouter } from './routers/book'

import * as bodyParser from 'body-parser'
// Simulate DELETE and PUT
import * as methodOverride from 'method-override'
import * as morgan from 'morgan'

const app = express()
const baseDir =
  process.env.NODE_ENV === 'production'
    ? path.resolve('/app/back/dist/')
    : path.resolve(__dirname, "../../")

// Middleware Setup

app.use(
  '/assets/',
  express.static(path.resolve(baseDir, 'assets'))
) // Set ingredient of static data
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

// Only auth on admin routes
app.use((req, res, next) => {
  // \/* ensures that api//admin also gets checked
  if (req.path.match(/\api\/*admin\/.*/)) {
    basicAuth({
      users: { admin: 'supersecret' },
      challenge: true
    })(req, res, next)
  } else {
    next()

  }
})

app.use('/api/book', bookRouter)
app.use('/api/admin', adminRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(baseDir, 'index.html'))
})

app.use(errorHandler)

export default app
