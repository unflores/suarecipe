import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

export interface ILocation {
  name?: string
  type?: string
  partsOfDay?: string[]
  description?: string
  siteLink?: string
  address?: string
  price?: number
  zipcode?: number
  city?: string
}

export interface ILocationModel extends ILocation, mongoose.Document {
}

export enum dayParts {
  morning   = 'morning',
  afternoon = 'afternoon',
  night     = 'night',
}

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: null,
    validate: {
      validator: (value) => {
        return value === null || typeof value === 'number' && value > 0
      },
    },
  },
  partsOfDay: {
    type: [String],
    validate:  {
      validator (parts) {
        const dayPartValues = Object.values(dayParts)
        const invalidDayParts = parts.filter(value => dayPartValues.indexOf(value) < 0)
        return parts.length > 0 && invalidDayParts == 0
      },
    },
  },
  description: String,
  siteLink: { // Link to the main site
    type: String,
    validate: {
      validator: (value) => {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value)
      },
      message: '{VALUE} is not a valid url',
    },
  },
  address: String,       // Street ex. 22 rue de chabrol
  zipcode: {
    type: String,       // ex. 75010
    required: true,
  },
})

locationSchema.plugin(uniqueValidator)

const Location = mongoose.model<ILocationModel>('Location', locationSchema)
export default Location
