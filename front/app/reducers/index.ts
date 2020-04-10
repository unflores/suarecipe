import { combineReducers } from 'redux'
import itineraryBuilder from './itineraryBuilder'
import { ItineraryBuilderState } from './itineraryBuilder'
import { IngredientsState, reduce as ingredients } from './ingredients'

export interface IApplicationState {
  itineraryBuilder: ItineraryBuilderState
  ingredients: IngredientsState
}

const rootReducer = combineReducers<IApplicationState>({
  itineraryBuilder,
  ingredients
})

export default rootReducer
