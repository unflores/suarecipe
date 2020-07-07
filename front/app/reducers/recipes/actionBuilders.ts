import { RecipeResponse, RecipesResponse, Recipe } from 'frontapp/libs/api/Responses'

export enum Actions {
  FETCH_RECIPES = 'fetch_recipes',
  UPDATE_RECIPE = 'update_recipe'
}

interface recipesFetchedReturn {
  payload: {
    recipes: Recipe[]
  },
  type: typeof Actions.FETCH_RECIPES
}

export const recipesFetched = (response: RecipesResponse): recipesFetchedReturn => ({
  payload: {
    recipes: response.recipes
  },
  type: Actions.FETCH_RECIPES
})

interface recipeUpdatedReturn {
  payload: {
    recipe: Recipe
  },
  type: typeof Actions.UPDATE_RECIPE
}

export const recipeUpdated = (response: RecipeResponse): recipeUpdatedReturn => ({
  payload: {
    recipe: response.recipe
  },
  type: Actions.UPDATE_RECIPE
})


export type ActionReturnTypes = recipeUpdatedReturn | recipesFetchedReturn
