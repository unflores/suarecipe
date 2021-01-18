import { combineReducers } from 'redux'
import { IngredientsState, reduce as ingredients } from './ingredients'
import { RecipesState, reduce as recipes } from './recipes'

export interface ApplicationState {
  ingredients: IngredientsState
  recipes: RecipesState
}

const rootReducer = combineReducers<ApplicationState>({
  ingredients,
  recipes,
})

export default rootReducer
