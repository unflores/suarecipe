import { Request, Response, Router } from 'express'
import * as Joi from '@hapi/joi'
import Ingredient from '../models/ingredient'

const schema = Joi.object({
  name: Joi.string()
})

const ingredientsController = Router()

ingredientsController.get('/', async function (req: Request, res: Response) {
  const ingredients = await Ingredient.find({})
  res.send(ingredients)
})

ingredientsController.patch('/:id', async function (req: Request, res: Response) {
  const body = schema.validate(req.body)
  if (body.error) {
    return res.status(400).json({ error: body.error });
  }

  const ingredient = await Ingredient.findById(req.params.id)

  ingredient.set(body.value).save().then(
    _ => res.send(ingredient)
  ).catch(
    result => res.status(400).send(result)
  )
})

export { ingredientsController }
