import { Ingredient } from 'frontapp/libs/api/Responses'

export enum Actions {
  FETCH_INGREDIENTS = 'fetch_ingredients',
  UPDATE_INGREDIENT = 'update_ingredient'
}

interface ingredientsFetchedReturn {
  payload: {
    ingredients: Ingredient[]
  },
  type: typeof Actions.FETCH_INGREDIENTS
}

export const ingredientsFetched = (ingredients: Ingredient[]): ingredientsFetchedReturn => ({
  payload: {
    ingredients
  },
  type: Actions.FETCH_INGREDIENTS
})

interface ingredientUpdatedReturn {
  payload: {
    ingredient: Ingredient
  },
  type: typeof Actions.UPDATE_INGREDIENT
}

export const ingredientUpdated = (ingredient: Ingredient): ingredientUpdatedReturn => ({
  payload: {
    ingredient
  },
  type: Actions.UPDATE_INGREDIENT
})


export type ActionReturnTypes = ingredientUpdatedReturn | ingredientsFetchedReturn
