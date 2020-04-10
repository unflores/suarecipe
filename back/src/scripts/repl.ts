import * as repl from 'repl'
import * as dotenv from 'dotenv'
dotenv.config()
import { dbSetup } from '../../config/mongoose'
dbSetup()

const replServer = repl.start('> ')
import Ingredient from '../models/ingredient'

import search from '../initializers/search'

replServer.context.search = search
replServer.context.Ingredient = Ingredient
/* tslint:disable: no-console*/
replServer.context.fin = (val) => {
  console.log(val)
}
