import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

export interface IRecipe {
  name?: string
}

const stepSchema = new Schema({
  body: {
    type: String,
    required: true
  }
})

const usedIngredientSchema = new Schema({
  ingredient: { type: mongoose.Types.ObjectId, ref: 'Ingredient' },
  quantity: {
    type: Number,
    required: true
  },
  measurement: {
    type: String,
    required: true
  }
})

export interface IRecipeModel extends IRecipe, mongoose.Document { }

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

export default mongoose.model<IRecipeModel>('Recipe', recipeSchema)
