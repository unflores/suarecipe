import * as mongoose from 'mongoose'
// import app from '../../../server'
// import * as request from 'supertest'
import Recipe, { IRecipe } from '../../../models/recipe'
// import { expect } from 'chai'

// const server = request(app)

const createRecipe = async () => {
  return await Recipe.create({
    name: 'Potato dipping sauce',
    steps: [
      { body: 'Put in garlic, lemon and yogurt' },
      { body: 'Stir in some thyme' }
    ],
    usedIngredients: [
      { ingredient: new mongoose.Types.ObjectId(), quantity: 2, measurement: 'piece' }
    ]
  })
}

describe('recipes/:recipe_id/steps', () => {
  let recipe: IRecipe

  describe('post', () => {

    beforeEach(async () => {
      recipe = await createRecipe()
      recipe._id
    })

    it.skip('Shows all recipes')
    it.skip('Creates a recipe')
    it.skip('Updates a recipe')

  })
})
