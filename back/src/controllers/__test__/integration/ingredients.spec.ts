import { expect } from 'chai'
import * as request from 'supertest'
import { IIngredientModel, Ingredient } from '../../../models/ingredient'
import app from '../../../server'

const server = request(app)

describe('ingredients', () => {
  describe('get', () => {
    let ingredient: IIngredientModel

    beforeEach(async () => {
      ingredient = await Ingredient.create({
        name: 'something',
        zipcode: 75010,
        type: 'thing',
        partsOfDay: 'afternoon'
      })
    })

    it('responds with a ingredient array', async () => {
      await server
        .get('/api/ingredients/')
        .expect(200)
        .then((response) => {
          const data = response.body
          expect(data.ingredients[0].name).to.eql(ingredient.name)
          expect(response.body.ingredients.length).to.eql(1)
        })

    })
  })
})
