import * as parse from 'csv-parse'
import database, { dbSetup } from '../../../config/mongoose'

dbSetup()

// import { MasterListHandler } from './masterListHandler'
import { createReadStream } from 'fs'
import * as path from 'path'
import { Ingredient } from '../../models/ingredient'
import { Recipe } from '../../models/recipe'

const fileName = path.resolve(__dirname, '../masterList.csv')
const csvParser = parse({
  delimiter: ',',
  columns: true,
  relax_column_count: true,
})
const fileStream = createReadStream(fileName)

interface Ingredient {
  name: string
}

const extractedIngredients: Ingredient[] = []

const seedDb = async () => {
  await clearDBCollections()

  fileStream
    .pipe(csvParser)
    .on('data', addIngredientParamsToExtracted)
    .on('end', async () => {
      await createIngredients(extractedIngredients)
      await createRecipes()
      process.exit()
    })
}

const clearDBCollections = async () => {
  Object.keys(database.connection.collections).forEach(async (collectionId) => {
    await database.connection.collections[collectionId].deleteMany({})
  })
}

const addIngredientParamsToExtracted =
  (imported: { Name: string }) => extractedIngredients.push({ name: imported.Name })

const createIngredients = async (ingredients: Ingredient[]) => {
  await Ingredient.collection.insertMany(ingredients)
}

const createRecipes = async () => {
  const [chicken, butter, salt] = await Ingredient.where(
    { name: { $in: ['Chicken Thigh', 'Butter', 'Salt'] } }
  )

  const recipes = [
    new Recipe({
      name: "Just butter",
      steps: [{ body: 'Put butter in a pan' }, { body: 'Stir it around...I have no idea' }]
    }),
    new Recipe({
      name: "Chicken on plate",
      usedIngredients: [
        { ingredient: chicken.id, quantity: 1, measurement: 'pound' },
        { ingredient: butter.id, quantity: 1, measurement: 'dollup' },
        { ingredient: salt.id, quantity: 2, measurement: 'teaspoons' },
      ],
      steps: [
        { body: 'Put that butter in the pan' },
        { body: 'Put Chicken in pan' },
        { body: 'Cook it for like 5 mins on high' },

      ]
    }),
  ]

  await Promise.all(
    recipes.map(async (recipe) => {
      await recipe.save()
    })
  )
}

seedDb()
