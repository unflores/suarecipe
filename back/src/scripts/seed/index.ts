import * as parse from 'csv-parse'
import database, { dbSetup } from '../../../config/mongoose'

dbSetup()

import { MasterListHandler } from './masterListHandler'
import { createReadStream } from 'fs'
import * as path from 'path'
import { Recipe } from '../../models/recipe'

const fileName = path.resolve(__dirname, '../masterList.csv')
const csvParser = parse({
  delimiter: ',',
  columns: true,
  relax_column_count: true,
})
const fileStream = createReadStream(fileName)

const handler = new MasterListHandler()

Object.keys(database.connection.collections).forEach((collectionId) => {
  database.connection.collections[collectionId].deleteMany({})
})

fileStream
  .pipe(csvParser)
  .on('data', handler.handleData)
  .on('end', handler.handleEnd)

const recipes = [
  new Recipe({
    name: "Just butter"
  }),
  new Recipe({
    name: "Chicken too"
  }),
]

recipes.map(async (recipe, index) => {
  await recipe.save()
})
