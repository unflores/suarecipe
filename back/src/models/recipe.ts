import { Document, model, Types, Schema } from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

export interface IRecipe extends Document {
  name?: string
  steps?: Types.DocumentArray<IStep>
  usedIngredients?: Types.DocumentArray<IUsedIngredient>
}

interface IUsedIngredient extends Document {
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
  ingredient: { type: Types.ObjectId, ref: 'Ingredient' },
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
})

recipeSchema.plugin(uniqueValidator)

export default model<IRecipe>('Recipe', recipeSchema)
