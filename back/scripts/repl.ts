const repl        = require('repl')
import mongooseConfig from '../config/mongoose'
mongooseConfig()

const replServer = repl.start('> ')
import Location from '../models/location'

replServer.context.Location = Location

