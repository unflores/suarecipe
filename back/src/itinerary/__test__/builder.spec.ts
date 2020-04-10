import { expect } from 'chai'
import * as Promise from 'bluebird'
import Ingredient, { IIngredient, IIngredientModel } from '../../models/ingredient'
import * as Builder from '../builder'


describe('Builder', () => {
  beforeEach((done) => {
    const ingredients: Array<Promise<IIngredientModel>> = []

    Array.from(Array(3)).forEach((val, index) => {
      const eveningParams: IIngredient = {
        name: `nameevening${index}`,
        type: 'type',
        partsOfDay: ['afternoon'],
        description: 'description',
        siteLink: 'http://derp.com',
        address: 'address',
        zipcode: 75010,
      }

      const eveningIngredient = new Ingredient(eveningParams)
      ingredients.push(eveningIngredient.save())
    })

    Array.from(Array(4)).forEach((val, index) => {
      const morningParams: IIngredient = {
        name: `namemorning${index}`,
        type: 'type',
        partsOfDay: ['morning'],
        description: 'description',
        siteLink: 'http://derp.com',
        address: 'address',
        zipcode: 75010,
      }

      const morningIngredient = new Ingredient(morningParams)

      ingredients.push(morningIngredient.save())
    })
    Promise.all(ingredients).then((locs) => {
      done()
    })
  })

  it('should return an itinerary of 3 days', (done) => {
    Builder.buildItinerary(3).then((itinerary) => {
      expect(itinerary.length).to.equal(3)
      done()
    })
  })

  it('should split mornings and evenings', (done) => {
    Builder.buildItinerary(3).then((itinerary) => {
      expect(itinerary[0].morning.partsOfDay).to.contain('morning')
      done()
    })
  })
})

