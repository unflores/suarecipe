import { Document, model, Schema, Types } from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

export interface IRecipe extends Document {
  name?: string
  steps?: Types.DocumentArray<IStep>
  usedIngredients?: Types.DocumentArray<IUsedIngredient>
}

interface IUsedIngredient extends Document {
  ingredient: Types.ObjectId
  quantity: number
  measurement: string
}
interface IStep extends Document {
  id?: Types.ObjectId
  body: string
}

const stepSchema = new Schema({
  body: {
    type: String,
    required: true
  }
})

const usedIngredientSchema = new Schema({
  ingredient: {
    required: true,
    type: Types.ObjectId,
    ref: 'Ingredient'
  },
  quantity: {
    type: Number,
    required: true
  },
  measurement: {
    type: String,
    required: true
  }
})

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  steps: [stepSchema],
  usedIngredients: [usedIngredientSchema]
  // tslint:disable-next-line: align
}, {
  toObject: {
    transform(doc, ret) {
      ret._id = ret._id.toString()
      delete ret.__v
    }
  }
})

recipeSchema.plugin(uniqueValidator)

export const Recipe = model<IRecipe>('Recipe', recipeSchema)
