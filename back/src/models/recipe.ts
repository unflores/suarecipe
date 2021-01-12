import { Document, model, Schema, Types } from 'mongoose'

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
  // tslint:disable-next-line: align
}, {
  toObject: {
    transform(doc, ret) {
      ret._id = ret._id.toString()
      delete ret.__v
    }
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
  // tslint:disable-next-line: align
}, {
  toObject: {
    transform(doc, ret) {
      ret._id = ret._id.toString()
      delete ret.__v
    }
  }
})

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
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

export const Recipe = model<IRecipe>('Recipe', recipeSchema)
