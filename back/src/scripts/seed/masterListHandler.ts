import * as Bluebird from 'bluebird'
import { Document } from 'mongoose'
import { logger } from '../../../config/logger'
import { Ingredient } from '../../models/ingredient'

interface IImportedIngredient {
  Name: string

}

interface IErrorListing {
  error_listing: string
  message: string
}

export class MasterListHandler {
  public tasks: Array<Bluebird<void | Document>>
  public errors: IErrorListing[]

  constructor() {
    this.tasks = []
    this.errors = []
  }

  public handleData = (imported: IImportedIngredient): void => {
    const ingredient = new Ingredient({
      name: imported.Name
    })

    this.tasks.push(
      ingredient.save().catch((err: Error) => {
        this.errors.push({
          error_listing: imported.Name,
          message: err.message,
        })
      })
    )
  }

  public handleError = (error): void => {
    logger.error(error)
  }

  public handleEnd = (): void => {
    Bluebird.all(this.tasks)
      .then((data) => {
        this.errors.forEach((error) => {
          logger.info({ error })
        })
        logger.info({
          total_rows: this.tasks.length,
          total_saved: this.tasks.length - this.errors.length,
        })
      })
      .catch((error) => {
        logger.info('Problem loading data', error)
      })
      .finally(() => {
        process.exit()
      })
  }
}
