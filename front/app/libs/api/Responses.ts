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

export interface StepsResponse {
  steps: Step[]
}

export interface Step {
  _id: string
  body: string
}

export interface UsedIngredient {
  ingredient: string
  quantity: number
  measurement: string
}

export interface Recipe {
  _id: string
  name: string
  usedIngredients?: UsedIngredient[]
  steps?: Step[]
}

export interface FullUsedIngredient {
  ingredient: { name: string, _id: string }
  quantity: number
  measurement: string
}

export interface FullRecipe {
  _id: string
  name: string
  usedIngredients?: FullUsedIngredient[]
  steps?: Step[]
}

