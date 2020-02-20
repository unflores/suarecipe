import { Request, Response, Router } from 'express'
import Location from '../models/location'


const router = Router()

router.get('/', async function (req: Request, res: Response) {
  const locations = await Location.find({})
  res.send(locations)
})

router.patch('/:id', async function (req: Request, res: Response) {
  res.send(req.body)
})

export default router;
