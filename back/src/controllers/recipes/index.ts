import { Request, Response } from 'express'
import * as Joi from '@hapi/joi'
import { Recipe } from '../../models/recipe'

const schema = Joi.object({
  name: Joi.string(),
})

async function list(req: Request, res: Response) {
  const recipes = await Recipe.find().populate('usedIngredients.ingredient')
  res.send(recipes)
}

async function update(req: Request, res: Response) {
  const body = schema.validate(req.body)
  if (body.error) {
    return res.status(400).json({ error: body.error });
  }

  const recipe = await Recipe.findById(req.params.id)

  recipe.set(body.value).save().then(
    _ => res.send(recipe)
  ).catch(
    result => res.status(400).send(result)
  )
}

export const recipesController = {
  list,
  update
}
