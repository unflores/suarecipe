import { Actions, ActionReturnTypes } from './actionBuilders'
import { Recipe } from 'frontapp/libs/api/Responses'


interface RecipeHash {
  [id: string]: Recipe
}

export interface RecipesState {
  readonly byId: RecipeHash,
  readonly ids: string[]
}

export const initialState: RecipesState = {
  byId: {},
  ids: []
}

export function reduce(state: RecipesState = initialState, action: ActionReturnTypes): RecipesState {
  let byId: RecipeHash = {}
  console.log({ action })
  switch (action.type) {
    case Actions.FETCH_RECIPES:
      const ids = action.payload.recipes.map((recipe: Recipe) => recipe._id)

      action.payload.recipes.forEach((recipe: Recipe) => byId[recipe._id] = recipe)
      return { ...state, ids, byId }
      break
    case Actions.UPDATE_RECIPE:
      byId = Object.assign({}, state.byId)
      byId[action.payload.recipe._id] = action.payload.recipe

      return { ...state, byId }
      break
    default:
      return state
  }
}
