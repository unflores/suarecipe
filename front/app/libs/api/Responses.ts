export interface Ingredient {
  _id: string
  name: string
}

export interface IngredientsResponse {
  ingredients: Ingredient[]
}

export interface RecipesResponse {
  recipes: Recipe[]
}
export interface RecipeResponse {
  recipe: Recipe
}

export interface Step {

}

export interface UsedIngredient {
  _id: string
  quantity: number
  measurement: string
}

export interface Recipe {
  _id: string
  name: string
  usedIngredients?: UsedIngredient[]
  steps?: Step[]
}
