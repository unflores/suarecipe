import { Request, Response, Router } from 'express'
import * as Joi from '@hapi/joi'
import Location from '../models/location'

const schema = Joi.object({
  name: Joi.string(),
  zipcode: Joi.number()
})

const router = Router()

router.get('/', async function (req: Request, res: Response) {
  const locations = await Location.find({})
  res.send(locations)
})

router.patch('/:id', async function (req: Request, res: Response) {
  const body = schema.validate(req.body)
  if (body.error) {
    return res.status(400).json({ error: body.error });
  }

  const location = await Location.findById(req.params.id)

  location.set(body.value).save().then(
    _ => res.send({ location })
  ).catch(
    result => res.status(400).send(result)
  )
})

export default router;
