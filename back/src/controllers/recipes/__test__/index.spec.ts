import * as mongoose from 'mongoose'
import app from '../../../server'
import * as request from 'supertest'
import { Recipe, IRecipe } from '../../../models/recipe'
import { expect } from 'chai'

const server = request(app)

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

describe('recipes', () => {
  let recipe: IRecipe

  beforeEach(async () => {
    recipe = await createRecipe()
    recipe._id
  })

  describe('/recipes/', () => {

    it('Shows all recipes', async () => {
      await server
        .get('/api/recipes/')
        .expect(200)
        .then(response => {
          const data = response.body
          expect(data.recipes.length).to.eql(1)
          expect(data.recipes[0].steps.length).to.eql(2)
          expect(data.recipes[0].usedIngredients.length).to.eql(1)
          expect(data.recipes[0].name).to.eql('Potato dipping sauce')
        })
    })

    it('Creates a recipe', async () => {
      await server
        .post('/api/recipes/')
        .send({
          name: 'Bean dip',
        })
        .expect(200)
        .then(response => {

          const data = response.body
          expect(data.recipe.name).to.eql('Bean dip')
        })
    })
  })

  describe('/recipes/:recipe_id', () => {
    it('Updates a recipe', async () => {
      await server
        .patch(`/api/recipes/${recipe._id}`)
        .send({
          name: 'Cheese dip',
        })
        .expect(200)
        .then(response => {

          const data = response.body
          expect(data.recipe.name).to.eql('Cheese dip')
        })
    })
  })

})
