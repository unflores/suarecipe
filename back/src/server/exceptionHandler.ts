
import { Express, Response, Request } from 'express'



export default (app: Express) => {

  app.use(function handleParamsError(error: Error, req: Request, res: Response, next) {
    if (error.name !== "ParamsError") {
      next(error)
    }
    console.log(error)

    return res.status(400).json({
      type: 'ParamsError',
      message: error.message
    })
  })

  app.use(function handleUnkown(error: Error, req: Request, res: Response, next) {
    console.log(error)

    return res.status(500).json({
      type: 'Unknown error',
      message: error.message
    })
  })
}
