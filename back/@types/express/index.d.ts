import { IRecipe } from "../../src/models/recipe"
import { IIngredientModel } from "../../src/models/ingredient"

declare global {
  namespace Express {
    export interface Request {
      paramObjects?: ParamObjects
    }
    export interface ParamObjects {
      recipe?: IRecipe
      ingredient?: IIngredientModel
    }
  }
}
