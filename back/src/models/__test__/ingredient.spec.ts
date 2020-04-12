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
})
