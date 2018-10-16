import express      from 'express'
import cookieParser from 'cookie-parser'

// Middleware
import morgan          from 'morgan'           // Logger
import bodyParser      from 'body-parser'      // Parses Html Body
import methodOverride  from 'method-override'  // Simulate DELETE and PUT

const app = express()

// Middleware Setup
app.use('/assets/', express.static(__dirname + '/front/assets')) // Set location of static data
// If we didn't find it in assets, send a 404
app.use('/assets/', (req, res) => {
  res.status(404).send('Not Found')
})
app.use(morgan('dev'))                                         // Log requests to console
app.use(bodyParser.urlencoded({'extended':'true'}))            // Parse extended utf urls
app.use(cookieParser())                                        // Read cookies for auth
app.use(bodyParser.json())                                     // Parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) // Parse incoming data as json
app.use(methodOverride())

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/front/index.html')
})

const port = process.env.PORT || '9090'
app.listen(port, '0.0.0.0')
console.log(`I see you on ${port}`)
