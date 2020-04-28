import { combineReducers } from 'redux'
import { IngredientsState, reduce as ingredients } from './ingredients'

export interface IApplicationState {
  ingredients: IngredientsState
}

const rootReducer = combineReducers<IApplicationState>({
  ingredients
})

export default rootReducer
