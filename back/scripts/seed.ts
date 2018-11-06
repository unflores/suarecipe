import * as parse from 'csv-parse'
import mongooseConfig from '../config/mongoose'
mongooseConfig()
import {createReadStream} from 'fs'
import * as path from 'path'
import Location from '../models/location'
import { ValidationError, Document } from 'mongoose'
import * as BlueBird from 'bluebird'
const Promise = BlueBird.Promise

const fileName    = path.resolve(__dirname, './masterList.csv')
const parser      = parse({delimiter: ',', columns: true})
const fileStream  = createReadStream(fileName)
const tasks: BlueBird<void | Document>[]  = []
const errors: Error[]   = []

interface IImportedLocation {
  Name: string
  Description: string
  Type: string
  website: string
  address: string
  zipcode: string
}


fileStream.pipe(parser).on('data', function(imported: IImportedLocation) {

  let location = new Location({
    name:         imported.Name,
    description:  imported.Description,
    type:         imported.Type,
    siteLink:     imported.website,
    address:      imported.address,
    zipcode:      imported.zipcode
  })

  tasks.push(location.save().catch((err: ValidationError) => {
    console.log('<<Error:>> name: ', imported.Name, 'website: ', imported.website)
    console.log(err.message)
    errors.push(err)
  }))


}).on('end', function() {
  Promise.all(tasks).then((data) => {
    console.log('total rows: ', tasks.length)
    console.log('total errors: ', errors.length)
    console.log('total saved: ', tasks.length - errors.length)
  }).catch((error) => {
    console.log('Problem loading data', error)
  }).finally(() => { process.exit() })
})



console.log('at the end of the hallway')
