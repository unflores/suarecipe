import * as Joi from '@hapi/joi'
import { Request, Response } from 'express'
import { IRecipe, Recipe } from '../../models/recipe'

const schema = Joi.object({
  recipe: Joi.object({
    name: Joi.string(),
    steps: Joi.array(),
    usedIngredients: Joi.array(),
  })
})

async function create(req: Request, res: Response) {
  const recipeAtts = req.body.recipe
  const recipe = await Recipe.create(recipeAtts)
  res.send({ recipe: recipe.toObject() })
}

async function show(req: Request, res: Response) {
  res.send({ recipe: req.paramObjects.recipe.toObject() })
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

  if (body.error) {
    return res.status(400).send({ error: body.error })
  }
  let { recipe } = req.paramObjects

  await recipe.set(body.value.recipe).save().then(async () => {
    recipe = await recipe.populate('usedIngredients.ingredient').execPopulate()
    res.send({ recipe: recipe.toObject() })
  }).catch((result) => {
    res.status(400).send({ error: result })
  })
}

export const recipesController = {
  create,
  list,
  update,
  show,
}
