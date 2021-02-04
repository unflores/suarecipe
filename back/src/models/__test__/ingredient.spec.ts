import { expect } from 'chai'
import { Ingredient } from '../ingredient'

describe('Ingredient', () => {
  const subject = new Ingredient({})

  it('requires name', () => {
    subject.validateSync()
    expect(subject.errors.name).not.to.be.an('undefined')
  })
})
