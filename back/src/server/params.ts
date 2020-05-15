import { NextFunction, Request, Response } from 'express'
import { Recipe } from '../models/recipe'
import { Ingredient } from '../models/ingredient'
import { ResourceNotFoundError } from './errorHandler'

export const findIngredient = async function (
  req: Request,
  _res: Response,
  next: NextFunction,
  id: string
) {
  const ingredient = await Ingredient.findOne({ _id: id })
  if (ingredient) {
    req.paramObjects = {}
    req.paramObjects.ingredient = ingredient
    next()
  } else {
    next(new ResourceNotFoundError('Failed to load ingredient from params'))
  }
}

export const findRecipe = async function (
  req: Request,
  _res: Response,
  next: NextFunction,
  id: string
) {
  const recipe = await Recipe.findOne({ _id: id })
  if (recipe) {
    req.paramObjects = {}
    req.paramObjects.recipe = recipe
    next()
  } else {
    next(new ResourceNotFoundError('Failed to load recipe from params'))
  }

}
