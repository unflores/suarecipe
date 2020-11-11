import * as dotenv from 'dotenv'
import * as repl from 'repl'
import { log } from '../utils/logging'

dotenv.config()
import { dbSetup } from '../../config/mongoose'
dbSetup()

const replServer = repl.start('> ')
import { Ingredient } from '../models/ingredient'
import { Recipe } from '../models/recipe'

replServer.context.log = log
replServer.context.Ingredient = Ingredient
replServer.context.Recipe = Recipe
/* tslint:disable: no-console*/
replServer.context.fin = (val) => {
  console.log(val)
}
