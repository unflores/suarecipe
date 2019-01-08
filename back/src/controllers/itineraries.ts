import { NextFunction, Request, Response } from "express"
import * as Builder from './../itinerary/builder'

export let post = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.days || req.body.days === 0) {
    res.status(400)
      .send(`bad request. days: ${req.body.days}`)
    next()
    return
  }
  Builder.buildItinerary(req.body.days)
    .then((itinerary) => {
      res.status(200).send({ itinerary })
      next()
    }).catch((error) => {
      console.log(error)
      res.status(500).send('Something went wrong')
      next()
    })
}
