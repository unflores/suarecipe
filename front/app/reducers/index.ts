import { combineReducers } from 'redux'
import { IngredientsState, reduce as ingredients } from './ingredients'
import { RecipesState, reduce as recipes } from './recipes'

export interface IApplicationState {
  ingredients: IngredientsState
  recipes: RecipesState
}

const rootReducer = combineReducers<IApplicationState>({
  ingredients,
  recipes,
})

export default rootReducer
