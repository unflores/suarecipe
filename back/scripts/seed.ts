import * as parse from 'csv-parse'
import mongooseConfig from '../config/mongoose'
mongooseConfig()
import {createReadStream} from 'fs'
import * as path from 'path'
import Location from '../models/location'
import { ValidationError, Document } from 'mongoose'
import * as Bluebird from 'bluebird'

interface IImportedLocation {
  Name: string
  Description: string
  Type: string
  website: string
  address: string
  zipcode: string
}

class MasterListHandler {

  tasks: Bluebird<void | Document>[]
  errors: string[]

  constructor(){
    this.tasks  = []
    this.errors = []
  }

  handleData = (imported: IImportedLocation): void => {
    let location = new Location({
      name:         imported.Name,
      description:  imported.Description,
      partsOfDay:    imported['Day Part'].split(','),
      type:         imported.Type,
      siteLink:     imported.website,
      address:      imported.address,
      zipcode:      imported.zipcode
    })

    this.tasks.push(location.save().catch((err: ValidationError) => {
      const objectErrors: string[] = []
      objectErrors.push(`listing: ${imported.Name}`)
      Object.entries(err).forEach(
        ([key, value]) => objectErrors.push(`${key} : ${value}`)
      )
      objectErrors.push('================')

      this.errors.push(objectErrors.join("\n"))
    }))
  }

  handleEnd = (): void => {
    Bluebird.all(this.tasks).then((data) => {
      console.log('errors: ', this.errors.join("\n"))
      console.log('total rows: ', this.tasks.length)
      console.log('total errors: ', this.errors.length)
      console.log('total saved: ', this.tasks.length - this.errors.length)
    }).catch((error) => {
      console.log('Problem loading data', error)
    }).finally(() => { process.exit() })
  }
}

const fileName    = path.resolve(__dirname, './masterList.csv')
const parser      = parse({delimiter: ',', columns: true})
const fileStream  = createReadStream(fileName)

const handler = new MasterListHandler()

fileStream.pipe(parser)
  .on('data', handler.handleData)
  .on('end', handler.handleEnd)

console.log('at the end of the hallway')
