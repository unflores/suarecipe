import { combineReducers } from 'redux'
import itineraryBuilder from './itineraryBuilder'
import { ItineraryBuilderState } from './itineraryBuilder'
import { LocationsState, reduce as locations } from './locations'

export interface IApplicationState {
  itineraryBuilder: ItineraryBuilderState
  locations: LocationsState
}

const rootReducer = combineReducers<IApplicationState>({
  itineraryBuilder,
  locations
})

export default rootReducer
