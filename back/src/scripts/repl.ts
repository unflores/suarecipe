const repl = require('repl')
import mongoose from '../../config/mongoose'
mongooseConfig()

const replServer = repl.start('> ')
import location from '../models/location'

replServer.context.Location = Location
replServer.context.fin = val => console.log(val)
