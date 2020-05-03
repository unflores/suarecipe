import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

export interface IIngredient {
  name?: string
  type?: string
}

export interface IIngredientModel extends IIngredient, mongoose.Document { }

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  type: {
    type: String
  }
})

ingredientSchema.plugin(uniqueValidator)

export const Ingredient = mongoose.model<IIngredientModel>('Ingredient', ingredientSchema)
