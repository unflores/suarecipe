import { expect } from 'chai'
import { Request } from 'express'
import * as sinon from 'sinon'
import { Ingredient } from '../../../models/ingredient'
import { IRecipe, Recipe } from '../../../models/recipe'
import { recipesController } from '../index'

const expectRecipeShape = (value, { name }: { name: string }) => {
  expect(value.recipe._id).to.be.a('string')
  expect(value.recipe.name).to.eql(name)
  expect(value.recipe.steps).to.be.an('array')
  expect(value.recipe.usedIngredients).to.be.an('array')
  expect(Object.keys(value.recipe)).to.have.members(['_id', 'name', 'steps', 'usedIngredients'])
}
const expectIngredientShape = (
  value,
  { name, measurement, quantity }: { name: string, measurement: string, quantity: number }) => {

  expect(value._id).to.be.a('string')
  expect(value.ingredient._id).to.be.a('string')
  expect(value.ingredient.name).to.eql(name)
  expect(value.measurement).to.eql(measurement)
  expect(value.quantity).to.eql(quantity)

}

describe('recipesController', () => {
  let res
  let resSpy

  beforeEach(() => {
    res = {
      send: () => res,
      status: () => res
    }
    resSpy = sinon.spy(res, 'send')
  })

  describe('create', () => {
    it('creates a new recipe', async () => {
      const req = { body: { recipe: { name: 'Garlic' } } }

      await recipesController.create(req as Request, res as any)

      const returned = resSpy.firstCall.args[0]
      expectRecipeShape(returned, { name: 'Garlic' })
    })
  })

  describe('update', () => {

    let ingredient
    let recipe

    beforeEach(async () => {
      ingredient = await Ingredient.create({ name: 'basil' })

      recipe = await Recipe.create({
        name: 'Recipe1',
        usedIngredients: [
          { ingredient, measurement: 'cup', quantity: 5 },
        ]
      })
    })

    it('updates a recipe', async () => {
      const req = {
        paramObjects: { recipe },
        body: {
          recipe: {
            name: 'Garlic',
            usedIngredients: [{ ingredient: ingredient._id, measurement: 'spoonful', quantity: 1 }]
          }
        }
      }

      await recipesController.update(req as Request, res as any)

      const returned = resSpy.firstCall.args[0]

      expectRecipeShape(returned, { name: 'Garlic' })
      expectIngredientShape(
        returned.recipe.usedIngredients[0],
        { name: 'basil', measurement: 'spoonful', quantity: 1 }
      )
    })

    // context('bad parameter passed', () => {
    //   it('returns a 400', () => { })
    //   it('does NOT update a recipe', () => {

    //   })
    // })
  })

  describe('show', () => {
    let recipe: IRecipe

    beforeEach(async () => {
      const ingredient = await Ingredient.create({ name: 'basil' })

      recipe = await Recipe.create({
        name: 'Recipe1',
        usedIngredients: [
          { ingredient, measurement: 'something', quantity: 5 },
        ],
        steps: [
          { body: 'stuff' }
        ]
      })
    })

    it('shows a recipe', async () => {
      const req = { paramObjects: { recipe } }

      await recipesController.show(req as Request, res as any)

      const returned = resSpy.firstCall.args[0]

      expectRecipeShape(returned, { name: 'Recipe1' })
      expect(Object.keys(returned.recipe.steps[0])).to.have.members(['_id', 'body'])
    })
  })

  describe('list', () => {
    beforeEach(async () => {
      await Recipe.create([{ name: 'Recipe1' }, { name: 'Recipe2' }])
    })

    it('shows all recipes', async () => {
      const req = { query: {} }
      await recipesController.list(req as Request, res as any)
      const returned = resSpy.firstCall.args[0]

      expect(returned.recipes.length).to.eql(2)
    })

    context('filtering recipe', () => {
      it('removes non-matching recipes', async () => {
        const req = { query: { search: 'Recipe1' } }
        await recipesController.list(req as Request, res as any)
        const returned = resSpy.firstCall.args[0]
        const recipeNames = returned.recipes.map((recipe) => recipe.name)
        expect(recipeNames).to.not.contain('Recipe2')
      })
    })

  })

})
