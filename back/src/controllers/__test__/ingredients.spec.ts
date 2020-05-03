import app from '../../server'
import * as request from 'supertest'
import { Ingredient, IIngredientModel } from '../../models/ingredient'
import { expect } from 'chai'

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
        .then(response => {
          const data = response.body[0]
          expect(data.name).to.eql(ingredient.name)
          expect(response.body.length).to.eql(1)
        })

    })
  })
})
