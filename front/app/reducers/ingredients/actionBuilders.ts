import { IngredientResponse } from 'frontapp/libs/api/Responses'

export enum Actions {
  FETCH_INGREDIENTS = 'fetch_ingredients',
  UPDATE_INGREDIENT = 'update_ingredient'
}

interface ingredientsFetchedReturn {
  payload: {
    ingredients: IngredientResponse[]
  },
  type: typeof Actions.FETCH_INGREDIENTS
}

export const ingredientsFetched = (ingredients: IngredientResponse[]): ingredientsFetchedReturn => ({
  payload: {
    ingredients
  },
  type: Actions.FETCH_INGREDIENTS
})

interface ingredientUpdatedReturn {
  payload: {
    ingredient: IngredientResponse
  },
  type: typeof Actions.UPDATE_INGREDIENT
}

export const ingredientUpdated = (ingredient: IngredientResponse): ingredientUpdatedReturn => ({
  payload: {
    ingredient
  },
  type: Actions.UPDATE_INGREDIENT
})


export type ActionReturnTypes = ingredientUpdatedReturn | ingredientsFetchedReturn
