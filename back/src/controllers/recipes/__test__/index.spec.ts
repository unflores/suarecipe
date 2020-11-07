import { expect } from 'chai'
import { Request } from 'express'
import * as sinon from 'sinon'
import { recipesController } from '../index'

describe('create', () => {
  it.only('creates a new recipe', async () => {
    const req = { body: { recipe: { name: 'thing' } } }
    const res = {
      send: sinon.spy()
    }
    await recipesController.create(req as Request, res as any)

    const returned = res.send.firstCall.args[0]
    expect(returned.recipe._id).to.be.a('string')
    expect(returned.recipe.name).to.eql('thing')
    expect(returned.recipe.steps).to.be.an('array')
    expect(returned.recipe.usedIngredients).to.be.an('array')
    expect(Object.keys(returned.recipe)).to.eql(['_id', 'name', 'steps', 'usedIngredients'])
  })
})
