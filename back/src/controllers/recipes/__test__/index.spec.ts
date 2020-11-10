import { expect } from 'chai'
import { Request } from 'express'
import * as sinon from 'sinon'
import { Ingredient } from '../../../models/ingredient'
import { IRecipe, Recipe } from '../../../models/recipe'
import { recipesController } from '../index'

describe('recipesController', () => {
  let res

  beforeEach(() => {
    res = {
      send: sinon.spy()
    }
  })

  describe('create', () => {
    it('creates a new recipe', async () => {
      const req = { body: { recipe: { name: 'thing' } } }

      await recipesController.create(req as Request, res as any)

      const returned = res.send.firstCall.args[0]
      expect(returned.recipe._id).to.be.a('string')
      expect(returned.recipe.name).to.eql('thing')
      expect(returned.recipe.steps).to.be.an('array')
      expect(returned.recipe.usedIngredients).to.be.an('array')
      expect(Object.keys(returned.recipe)).to.eql(['_id', 'name', 'steps', 'usedIngredients'])
    })
  })

  describe('show', () => {
    let recipe: IRecipe

    beforeEach(async () => {
      const ingredient = await Ingredient.create({ name: 'basil' })

      recipe = await Recipe.create({
        name: 'Recipe1',
        usedIngredients: [
          { ingredient, measurement: 'something', quantity: 5 },
        ]
      })
    })

    it('shows a recipe', async () => {
      const req = { body: { recipe } }

      await recipesController.create(req as Request, res as any)

      const returned = res.send.firstCall.args[0]
      expect(returned.recipe._id).to.be.a('string')
      expect(returned.recipe.name).to.eql('Recipe1')
      expect(returned.recipe.steps).to.be.an('array')
      expect(returned.recipe.usedIngredients[0].ingredient.name).to.eql('basil')
      expect(
        Object.keys(returned.recipe)
      ).to.contain.members(['_id', 'name', 'steps', 'usedIngredients'])
    })
  })

  describe('list', () => {

    beforeEach(async () => {
      await Recipe.create([{ name: 'Recipe1' }, { name: 'Recipe2' }])
    })

    it('shows all recipes', async () => {
      const req = { query: {} }
      await recipesController.list(req as Request, res as any)
      const returned = res.send.firstCall.args[0]

      expect(returned.recipes.length).to.eql(2)
    })

    context('filtering recipe', () => {
      it('removes non-matching recipes', async () => {
        const req = { query: { search: 'Recipe1' } }
        await recipesController.list(req as Request, res as any)
        const returned = res.send.firstCall.args[0]
        const recipeNames = returned.recipes.map((recipe) => recipe.name)
        expect(recipeNames).to.not.contain('Recipe2')
      })
    })

  })

})
