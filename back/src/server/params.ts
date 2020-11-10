import { NextFunction, Request, Response } from 'express'
import { Ingredient } from '../models/ingredient'
import { Recipe } from '../models/recipe'
import { ResourceNotFoundError } from './errorHandler'

export const findIngredient = async (
  req: Request,
  _res: Response,
  next: NextFunction,
  id: string
) => {
  const ingredient = await Ingredient.findOne({ _id: id })
  if (ingredient) {
    req.paramObjects = {}
    req.paramObjects.ingredient = ingredient
    next()
  } else {
    next(new ResourceNotFoundError('Failed to load ingredient from params'))
  }
}

export const findRecipe = async (
  req: Request,
  _res: Response,
  next: NextFunction,
  id: string
) => {
  const recipe = await Recipe.findOne({ _id: id }).populate('usedIngredients.ingredient')
  if (recipe) {
    req.paramObjects = {}
    req.paramObjects.recipe = recipe
    next()
  } else {
    next(new ResourceNotFoundError('Failed to load recipe from params'))
  }

}
