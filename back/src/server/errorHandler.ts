
import { Response, Request, NextFunction } from 'express'

export class ResourceNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ResourceNotFoundError'
  }
}

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  let code: number

  switch (error.name) {
    case 'ResourceNotFoundError':
      code = 404
    default:
      code = 500
  }

  return res.status(code).json({
    type: error.name,
    message: error.message
  })
}
