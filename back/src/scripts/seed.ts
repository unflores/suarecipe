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

class MasterListHandler {
  public tasks: Array<Bluebird<void | Document>>
  public errors: string[]

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
        const objectErrors: string[] = []
        objectErrors.push(`Error listing: ${imported.Name}`)
        objectErrors.push(`message: ${err.message}`)
        objectErrors.push('================')

        this.errors.push(objectErrors.join('\n'))
      }),
    )
  }

  public handleEnd = (): void => {
    Bluebird.all(this.tasks)
      .then((data) => {
        logger.info(`Errors: ${this.errors.join('\n')}`)
        logger.info(`Total rows: ${this.tasks.length}`)
        logger.info(`Total errors: ${this.errors.length}`)
        logger.info(`Total saved: ${this.tasks.length - this.errors.length}`)
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
const parser = parse({ delimiter: ',', columns: true })
const fileStream = createReadStream(fileName)

const handler = new MasterListHandler()

fileStream
  .pipe(parser)
  .on('data', handler.handleData)
  .on('end', handler.handleEnd)
