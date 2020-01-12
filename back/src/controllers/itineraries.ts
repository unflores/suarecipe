import { Router, Request, Response, NextFunction } from 'express'
import logger from '../../config/logger'
import * as Builder from './../itinerary/builder'

const router = Router()
router.post('/', function (req: Request, res: Response, next: NextFunction) {
  if (!req.body.days || req.body.days === 0) {
    res.status(400).send(`bad request. days: ${req.body.days}`)
    next()
    return
  }
  Builder.buildItinerary(req.body.days)
    .then((itinerary) => {
      res.status(200).send({ itinerary })
      next()
    })
    .catch((error) => {
      logger.error(error)
      res.status(500).send('Something went wrong')
      next()
    })
})

export default router
