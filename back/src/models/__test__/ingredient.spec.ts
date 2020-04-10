import { expect } from 'chai'
import Ingredient, { IIngredient } from '../ingredient'

describe('Ingredient', () => {
  const subject = new Ingredient({})

  it('requires name', (done) => {
    subject.validate((error) => {
      expect(error.errors.name).not.to.be.an('undefined')
      done()
    })
  })

  it('name is unique', (done) => {
    const params: IIngredient = {
      name: 'name',
      type: 'type',
      partsOfDay: ['night'],
      description: 'description',
      siteLink: 'http://derp.com',
      price: 38,
      address: 'street',
      zipcode: 75010,
    }
    const ingredient = new Ingredient(params)

    ingredient.save((error) => {
      expect(error).to.be.an('null')
      const ingredient2 = new Ingredient(params)
      ingredient2.save((error1) => {
        expect(error1.errors.name).not.to.be.an('undefined')
        done()
      })
    })
  })

  it('requires type', (done) => {
    subject.validate((error) => {
      expect(error.errors.type).not.to.be.an('undefined')
      done()
    })
  })

  it('requires zipcode', (done) => {
    subject.validate((error) => {
      expect(error.errors.zipcode).not.to.be.an('undefined')
      done()
    })
  })

  it('requires partsOfDay to have values from dayParts enum', (done) => {
    const ingredient = new Ingredient({ partsOfDay: ['derply'] })
    ingredient.validate((error) => {
      expect(error.errors.partsOfDay).not.to.be.an('undefined')
      done()
    })
  })

  it('requires siteLink to be a url', (done) => {
    const ingredient = new Ingredient({ siteLink: 'derply' })
    ingredient.validate((error) => {
      expect(error.errors.siteLink).not.to.be.an('undefined')
      done()
    })
  })
})
