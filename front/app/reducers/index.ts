import { combineReducers } from 'redux'
import itineraryBuilder from './itineraryBuilder'
import { ItineraryBuilderState } from './itineraryBuilder/actionBuilders'

export interface IApplicationState {
  itineraryBuilder: ItineraryBuilderState
}

const rootReducer = combineReducers<IApplicationState>({
  itineraryBuilder,
})

export default rootReducer
