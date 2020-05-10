import { NextFunction, Request, Response } from 'express'
import { Recipe, IRecipeModel } from '../models/recipe'
import { Ingredient, IIngredientModel } from '../models/ingredient'

class ParamsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ParamsError'
  }
}

interface ParamObjects {
  recipe?: IRecipeModel
  ingredient?: IIngredientModel
}

// TODO: This should really go elsewhere
declare global {
  namespace Express {
    interface Request {
      paramObjects?: ParamObjects
    }
  }
}

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
    next(new ParamsError('Failed to load ingredient from params'))
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
    next(new ParamsError('Failed to load recipe from params'))
  }

}
