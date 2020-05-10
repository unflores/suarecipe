import { Request, Response } from 'express'
import * as Joi from '@hapi/joi'
import { Recipe } from '../../models/recipe'

const schema = Joi.object({
  name: Joi.string(),
})


async function create(req: Request, res: Response) {
  const recipe = await Recipe.create({ name: req.body.name })
  res.send({ recipe })
}

async function list(req: Request, res: Response) {
  const recipes = await Recipe.find().populate('usedIngredients.ingredient')
  res.send({ recipes: recipes })
}

async function update(req: Request, res: Response) {
  const body = schema.validate(req.body)
  if (body.error) {
    return res.status(400).json({ error: body.error })
  }
  const { recipe } = req.paramObjects
  recipe.set(body.value).save().then(
    _ => res.send({ recipe })
  ).catch(
    result => res.status(400).send({ error: result })
  )
}

export const recipesController = {
  create,
  list,
  update
}
