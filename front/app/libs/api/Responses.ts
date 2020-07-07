interface IEvent {
  name: string
  description: string
  type: string
  siteLink: string
  address: string
}

export interface IngredientResponse {
  _id: string
  name: string
}

export interface RecipesResponse {
  recipes: Recipe[]
}
export interface RecipeResponse {
  recipe: Recipe
}

export interface Recipe {
  _id: string
  name: string
}
