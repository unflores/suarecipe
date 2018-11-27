import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

export interface ILocation {
  name?: string
  type?: string
  partsOfDay?: string[]
  description?: string
  siteLink?: string
  street?: string
  zipcode?: number
  city?: string
}

export interface ILocationModel extends ILocation, mongoose.Document {
}

export enum dayParts {
  morning   = 'morning',
  afternoon = 'afternoon',
  night     = 'night'
}

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true }
  },
  type: {
    type: String,
    required: true
  },
  partsOfDay: {
    type: [String],
    validate:  {
      validator: function (parts) {
        let dayPartValues = Object.values(dayParts)
        let invalidDayParts = parts.filter(value => dayPartValues.indexOf(value) < 0)
        return parts.length > 0 && invalidDayParts == 0
      }
    }
  },
  description: String,
  siteLink: { // Link to the main site
    type: String,
    validate: {
      validator: (value) => {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value)
      },
      message: '{VALUE} is not a valid url'
    }
  },
  street: String,       // Street ex. 22 rue de chabrol
  zipcode: {
    type: String,       // ex. 75010
    required: true
  }
})

locationSchema.plugin(uniqueValidator)

const Location: mongoose.Model<ILocationModel> = mongoose.model<ILocationModel>('Location', locationSchema)
export default Location
