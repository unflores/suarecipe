import * as dotenv from 'dotenv'
import * as repl from 'repl'
import * as util from 'util'

dotenv.config()
import { dbSetup } from '../../config/mongoose'
dbSetup()

const replServer = repl.start('> ')
import { Ingredient } from '../models/ingredient'
import { Recipe } from '../models/recipe'

replServer.context.show = (thing) => {
  console.log(util.inspect(thing, false, null, true))
}
replServer.context.Ingredient = Ingredient
replServer.context.Recipe = Recipe
/* tslint:disable: no-console*/
replServer.context.fin = (val) => {
  console.log(val)
}
