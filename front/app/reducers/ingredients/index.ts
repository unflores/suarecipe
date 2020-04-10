import { Actions, ActionReturnTypes } from './actionBuilders'
import { IngredientResponse } from 'frontapp/libs/api/Responses'


interface IngredientHash {
  [id: string]: IngredientResponse
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
    case Actions.FETCH_LOCATIONS:
      const ids = action.payload.ingredients.map((ingredient: IngredientResponse) => ingredient._id)

      action.payload.ingredients.forEach((ingredient: IngredientResponse) => byId[ingredient._id] = ingredient)
      return { ...state, ids, byId }
      break
    case Actions.UPDATE_LOCATION:
      byId = Object.assign({}, state.byId)
      byId[action.payload.ingredient._id] = action.payload.ingredient

      return { ...state, byId }
      break
    default:
      return state
  }
}
