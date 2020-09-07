import { Actions, ActionReturnTypes } from './actionBuilders'
import { Ingredient } from 'frontapp/libs/api/Responses'


interface IngredientHash {
  [id: string]: Ingredient
}

export interface IngredientsState {
  readonly byId: IngredientHash,
  readonly ids: string[]
}

export const initialState: IngredientsState = {
  byId: {},
  ids: []
}

export function reduce(state: IngredientsState = initialState, action: ActionReturnTypes): IngredientsState {
  let byId: IngredientHash = {}

  switch (action.type) {
    case Actions.FETCH_INGREDIENTS:
      const ids = action.payload.ingredients.map((ingredient: Ingredient) => ingredient._id)

      action.payload.ingredients.forEach((ingredient: Ingredient) => byId[ingredient._id] = ingredient)
      return { ...state, ids, byId }
      break
    case Actions.UPDATE_INGREDIENT:
      byId = Object.assign({}, state.byId)
      byId[action.payload.ingredient._id] = action.payload.ingredient

      return { ...state, byId }
      break
    default:
      return state
  }
}
