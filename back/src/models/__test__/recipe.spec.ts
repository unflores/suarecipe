import { expect } from 'chai'
import { IRecipe, Recipe } from '../recipe'

describe('Recipe', () => {

  it('requires name', (done) => {
    const subject = new Recipe({})

    subject.validate((error) => {
      expect(error.errors.name).not.to.be.an('undefined')
      done()
    })
  })

  describe('usedIngredients', () => {
    let subject: IRecipe

    beforeEach(() => {
      subject = new Recipe({ usedIngredients: [{}] })
    })

    it('requires ingredient for usedIngredient', (done) => {
      subject.validate((error) => {
        expect(error.errors['usedIngredients.0.ingredient']).not.to.be.an('undefined')
        done()
      })
    })

    it('requires quantity for usedIngredient', (done) => {
      subject.validate((error) => {
        expect(error.errors['usedIngredients.0.quantity']).not.to.be.an('undefined')
        done()
      })
    })

    it('requires measurement for usedIngredient', (done) => {
      subject.validate((error) => {
        expect(error.errors['usedIngredients.0.measurement']).not.to.be.an('undefined')
        done()
      })
    })
  })

})
