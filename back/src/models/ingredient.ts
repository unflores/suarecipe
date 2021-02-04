import { Document, model, Schema } from 'mongoose'
export interface IIngredient {
  name?: string
  type?: string
}

export interface IIngredientModel extends IIngredient, Document { }

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  type: {
    type: String
  }
  // tslint:disable-next-line: align
}, {
  toObject: {
    transform(_doc, ret) {
      ret._id = ret._id.toString()
      delete ret.__v
    }
  }
})

export const Ingredient = model<IIngredientModel>('Ingredient', ingredientSchema)
