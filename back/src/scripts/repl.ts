import * as repl from 'repl'
import mongoose from '../../config/mongoose'
mongoose()

const replServer = repl.start('> ')
import Location from '../models/location'

console.log('Location: ', Location)

replServer.context.Location = Location
/* tslint:disable:no-console*/
replServer.context.fin = (val) => {
  console.log(val)
}
