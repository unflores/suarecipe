import { NextFunction, Request, Response } from 'express'
import { IRecipe } from 'src/models/recipe'
import { Recipe } from 'src/models/recipe'
import { Ingredient, IIngredient } from 'src/models/ingredient'

class ParamsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ParamsError'
  }
}

interface ParamObjects {
  recipe?: IRecipe
  ingredient?: IIngredient
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
