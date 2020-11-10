
import { NextFunction, Request, Response } from 'express'
import { logger } from '../../config/logger'
export class ResourceNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ResourceNotFoundError'
  }
}

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  let code: number

  logger.error({ message: error.message, stacktrace: error.stack })

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
