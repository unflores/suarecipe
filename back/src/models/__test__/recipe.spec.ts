import { expect } from 'chai'
import { IRecipe, Recipe } from '../recipe'

describe('Recipe', () => {

  it('requires name', (done) => {
    const subject = new Recipe({})

    subject.validateSync()
    expect(subject.errors.name).not.to.be.an('undefined')
  })

  describe('usedIngredients', () => {
    let subject: IRecipe

    beforeEach(() => {
      subject = new Recipe({ usedIngredients: [{}] })
    })

    it('requires ingredient for usedIngredient', () => {
      subject.validateSync()
      expect(subject.errors['usedIngredients.0.ingredient']).not.to.be.an('undefined')
    })

    it('requires quantity for usedIngredient', () => {
      subject.validateSync()
      expect(subject.errors['usedIngredients.0.quantity']).not.to.be.an('undefined')
    })

    it('requires measurement for usedIngredient', () => {
      subject.validateSync()
      expect(subject.errors['usedIngredients.0.measurement']).not.to.be.an('undefined')
    })
  })

})
