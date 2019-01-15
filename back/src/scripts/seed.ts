import * as parse from 'csv-parse'
import mongoose from '../../config/mongoose'
mongoose()
import * as Bluebird from 'bluebird'
import { createReadStream } from 'fs'
import { Document } from 'mongoose'
import * as path from 'path'
import logger from '../../config/logger'
import Location from '../models/location'

interface IImportedLocation {
  Name: string
  Description: string
  Type: string
  website: string
  address: string
  zipcode: string
  Price: number
}

interface IErrorListing {
  error_listing: string
  message: string
}

class MasterListHandler {
  public tasks: Array<Bluebird<void | Document>>
  public errors: IErrorListing[]

  constructor() {
    this.tasks = []
    this.errors = []
  }

  public handleData = (imported: IImportedLocation): void => {
    const location = new Location({
      name: imported.Name,
      description: imported.Description,
      partsOfDay: imported['Day Part'].split(','),
      type: imported.Type,
      price: imported.Price,
      siteLink: imported.website,
      address: imported.address,
      zipcode: imported.zipcode,
    })

    this.tasks.push(
      location.save().catch((err: Error) => {
        this.errors.push({
          error_listing: imported.Name,
          message: err.message,
        })
      }),
    )
  }

  public handleError = (error): void => {
    logger.error(error)
  }

  public handleEnd = (): void => {
    Bluebird.all(this.tasks)
      .then((data) => {
        this.errors.forEach((error) => {
          logger.info({ error: error })
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

const fileName = path.resolve(__dirname, './masterList.csv')
const parser = parse({
  delimiter: ',',
  columns: true,
  relax_column_count: true,
})
const fileStream = createReadStream(fileName)

const handler = new MasterListHandler()

fileStream
  .pipe(parser)
  .on('data', handler.handleData)
  .on('end', handler.handleEnd)
