import * as repl from 'repl'
import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from '../../config/mongoose'
mongoose()

const replServer = repl.start('> ')
import Location from '../models/location'

import search from '../initializers/search'

replServer.context.search = search
replServer.context.Location = Location
/* tslint:disable: no-console*/
replServer.context.fin = (val) => {
  console.log(val)
}
