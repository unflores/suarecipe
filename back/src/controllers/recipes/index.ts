import * as Joi from '@hapi/joi'
import { Request, Response } from 'express'
import { inspect } from 'util'
import { IRecipe, Recipe } from '../../models/recipe'

const schema = Joi.object({
  name: Joi.string(),
  steps: Joi.array(),
  usedIngredients: Joi.array(),
})

async function create(req: Request, res: Response) {
  const recipeAtts = req.body.recipe
  const recipe = await Recipe.create(recipeAtts)
  res.send({ recipe: recipe.toObject() })
}

async function show(req: Request, res: Response) {
  res.send({ recipe: req.paramObjects.recipe })
}

async function list(req: Request, res: Response) {
  const { search } = req.query
  let recipes: IRecipe[]

  if (search) {
    recipes = await Recipe.find(
      { name: { $in: new RegExp(`${search}`, 'i') } }
    ).populate('usedIngredients.ingredient')
  } else {
    recipes = await Recipe.find().populate('usedIngredients.ingredient')
  }

  res.send({ recipes })
}

async function update(req: Request, res: Response) {
  const body = schema.validate(req.body)
  console.log(inspect(body, false, null, true))
  if (body.error) {
    return res.status(400).json({ error: body.error })
  }
  const { recipe } = req.paramObjects
  console.log({ recipe })
  recipe.set(body.value).save().then(
    _ => res.send({ recipe })
  ).catch(
    result => res.status(400).send({ error: result })
  )
}

export const recipesController = {
  create,
  list,
  update,
  show,
}
