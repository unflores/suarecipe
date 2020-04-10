import { IngredientResponse } from 'frontapp/libs/api/Responses'

export enum Actions {
  FETCH_LOCATIONS = 'fetch_ingredients',
  UPDATE_LOCATION = 'update_ingredient'
}

interface ingredientsFetchedReturn {
  payload: {
    ingredients: IngredientResponse[]
  },
  type: typeof Actions.FETCH_LOCATIONS
}

export const ingredientsFetched = (ingredients: IngredientResponse[]): ingredientsFetchedReturn => ({
  payload: {
    ingredients
  },
  type: Actions.FETCH_LOCATIONS
})

interface ingredientUpdatedReturn {
  payload: {
    ingredient: IngredientResponse
  },
  type: typeof Actions.UPDATE_LOCATION
}

export const ingredientUpdated = (ingredient: IngredientResponse): ingredientUpdatedReturn => ({
  payload: {
    ingredient
  },
  type: Actions.UPDATE_LOCATION
})


export type ActionReturnTypes = ingredientUpdatedReturn | ingredientsFetchedReturn
