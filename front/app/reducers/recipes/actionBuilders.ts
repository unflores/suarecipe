import { Recipe, RecipeResponse, RecipesResponse } from 'frontapp/libs/api/Responses'

export enum Actions {
  FETCH_RECIPES = 'fetch_recipes',
  UPDATE_RECIPE = 'update_recipe',
}

interface RecipesFetchedReturn {
  payload: {
    recipes: Recipe[],
  },
  type: typeof Actions.FETCH_RECIPES
}

export const recipesFetched = (response: RecipesResponse): RecipesFetchedReturn => ({
  payload: {
    recipes: response.recipes,
  },
  type: Actions.FETCH_RECIPES,
})

interface RecipeUpdatedReturn {
  payload: {
    recipe: Recipe,
  },
  type: typeof Actions.UPDATE_RECIPE
}

export const recipeUpdated = (response: RecipeResponse): RecipeUpdatedReturn => ({
  payload: {
    recipe: response.recipe,
  },
  type: Actions.UPDATE_RECIPE,
})

export type ActionReturnTypes = RecipeUpdatedReturn | RecipesFetchedReturn
