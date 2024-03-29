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

describe('recipes/:recipe_id/steps', () => {

  let recipe: IRecipe

  describe('post', () => {

    beforeEach(async () => {
      recipe = await createRecipe()

    })

    it('adds a new step', async () => {
      await server
        .post(`/api/admin/recipes/${recipe.id}/steps`)
        .send({ step: { body: 'Add dat good sauce' } })
        .expect(200)
        .then(response => {
          const data = response.body
          expect(data.step.body).to.eql('Add dat good sauce')
        })
    })

    it('updates the steps of a recipe', async () => {
      const steps = recipe.steps
      steps[0].body = 'Put in best garlic, lemon and some yogurt'

      await server
        .patch(`/api/admin/recipes/${recipe.id}/steps`)
        .send({ steps })
        .expect(200)
        .then(response => {
          const data = response.body
          expect(data.steps[0].body).to.eql('Put in best garlic, lemon and some yogurt')
          expect(data.steps[1].body).to.eql(steps[1].body)
          expect(data.steps.length).to.eql(2)
        })
    })

    it('deletes a step', async () => {
      const steps = recipe.steps

      await server
        .delete(`/api/admin/recipes/${recipe.id}/steps/${steps[0]._id}`)
        .expect(200)
        .then(response => {
          const data = response.body
          expect(data.steps[0].body).to.eql(steps[1].body)
          expect(data.steps.length).to.eql(1)
        })
    })
  })
})
