import { Ingredient } from 'frontapp/libs/api/Responses'

export enum Actions {
  FETCH_INGREDIENTS = 'fetch_ingredients',
  UPDATE_INGREDIENT = 'update_ingredient',
}

interface IngredientsFetchedReturn {
  payload: {
    ingredients: Ingredient[],
  },
  type: typeof Actions.FETCH_INGREDIENTS
}

export const ingredientsFetched = (ingredients: Ingredient[]): IngredientsFetchedReturn => ({
  payload: {
    ingredients,
  },
  type: Actions.FETCH_INGREDIENTS,
})

interface IngredientUpdatedReturn {
  payload: {
    ingredient: Ingredient,
  },
  type: typeof Actions.UPDATE_INGREDIENT
}

export const ingredientUpdated = (ingredient: Ingredient): IngredientUpdatedReturn => ({
  payload: {
    ingredient,
  },
  type: Actions.UPDATE_INGREDIENT,
})

export type ActionReturnTypes = IngredientUpdatedReturn | IngredientsFetchedReturn
