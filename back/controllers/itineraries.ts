import { Request, Response, NextFunction } from "express"

export let post = (req: Request, res: Response, next: NextFunction) => {
  if(!req.body['days'] || req.body['days'] === 0) {
    res.sendStatus(400)
    next()
    return
  }


  res.sendStatus(200)
  next()
}
