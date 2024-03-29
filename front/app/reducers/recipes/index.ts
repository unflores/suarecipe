import { mergeIntersect } from 'frontapp/api'
import { Recipe } from 'frontapp/libs/api/Responses'
import { ActionReturnTypes, Actions } from './actionBuilders'

interface RecipeHash {
  [id: string]: Recipe
}

export interface RecipesState {
  readonly byId: RecipeHash,
  readonly ids: string[]
}

export const initialState: RecipesState = {
  byId: {},
  ids: [],
}

export function reduce(state: RecipesState = initialState, action: ActionReturnTypes): RecipesState {
  let byId: RecipeHash = {}
  switch (action.type) {
    case Actions.FETCH_RECIPES:
      const ids = action.payload.recipes.map((recipe: Recipe) => recipe._id)

      action.payload.recipes.forEach((recipe: Recipe) => byId[recipe._id] = recipe)
      return { ...state, ids, byId }
      break
    case Actions.UPDATE_RECIPE:
      byId = { ...state.byId }
      byId[action.payload.recipe._id] = mergeIntersect(byId[action.payload.recipe._id], action.payload.recipe)

      return { ...state, byId }
      break
    default:
      return state
  }
}
