import { Request, Response } from 'express'
import * as Joi from '@hapi/joi'
import { Ingredient, IIngredient } from '../models/ingredient'

const schema = Joi.object({
  name: Joi.string()
})

async function list(req: Request, res: Response) {
  const { search } = req.query
  let ingredients: IIngredient[]

  if (search) {
    ingredients = await Ingredient.find({ name: { $in: new RegExp(`${search}`, 'i') } })
  } else {
    ingredients = await Ingredient.find()
  }

  res.send({ ingredients: ingredients })
}

async function update(req: Request, res: Response) {
  const { ingredient } = req.paramObjects
  const body = schema.validate(req.body)
  if (body.error) {
    return res.status(400).json({ error: body.error });
  }


  ingredient.set(body.value).save().then(
    _ => res.send(ingredient)
  ).catch(
    result => res.status(400).send(result)
  )
}

export const ingredientsController = {
  list,
  update
}
