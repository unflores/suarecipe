import { expect } from 'chai'

import * as request from 'supertest'
import { Ingredient } from '../../../../models/ingredient'
import { IRecipe, Recipe } from '../../../../models/recipe'
import app from '../../../../server'

const server = request(app)

const createRecipe = async () => {
  const ingredient = await Ingredient.create({ name: 'basil' })
  return await Recipe.create({
    name: 'Potato dipping sauce',
    steps: [
      { body: 'Put in garlic, lemon and yogurt' },
      { body: 'Stir in some thyme' },
    ],
    usedIngredients: [
      { ingredient: ingredient._id, quantity: 2, measurement: 'piece' },
    ]
  })
}

describe('recipes', () => {
  let recipe: IRecipe

  beforeEach(async () => {
    recipe = await createRecipe()
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
          recipe: { name: 'Bean dip' }
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
          recipe: {
            name: 'Cheese dip',
          }
        })
        .expect(200)
        .then(response => {

          const data = response.body
          console.log({ data })
          expect(data.recipe.name).to.eql('Cheese dip')
        })
    })
  })

})
