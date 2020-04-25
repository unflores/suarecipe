
import { Express } from 'express'



export default (app: Express) => {

  app.use(function handleParamsError(error: Error, req, res, next) {
    if (error.name !== "ParamsError") {
      next(error)
    }

    return res.status(400).json({
      type: 'ParamsError',
      message: error.message
    })
  })
}
