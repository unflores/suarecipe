import { combineReducers } from 'redux'
import itineraryBuilder from './itineraryBuilder'
import { IState } from './itineraryBuilder/actionBuilders'

export interface IApplicationState {
  itineraryBuilder: IState
}

const rootReducer = combineReducers<IApplicationState>({
  itineraryBuilder,
})

export default rootReducer
