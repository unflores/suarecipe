import * as repl from 'repl'
import * as dotenv from 'dotenv'
dotenv.config()
import { dbSetup } from '../../config/mongoose'
dbSetup()

const replServer = repl.start('> ')
import { Ingredient } from 'src/models/ingredient'
import { Recipe } from 'src/models/recipe'

replServer.context.Ingredient = Ingredient
replServer.context.Recipe = Recipe
/* tslint:disable: no-console*/
replServer.context.fin = (val) => {
  console.log(val)
}
