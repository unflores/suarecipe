import { Actions, ActionReturnTypes } from './actionBuilders'
import { LocationResponse } from 'frontapp/libs/api/Responses'


interface LocationHash {
  [id: string]: LocationResponse
}

export interface LocationsState {
  readonly byId: LocationHash,
  readonly ids: string[]
}

export const initialState: LocationsState = {
  byId: {},
  ids: []
}

export function reduce(state: LocationsState = initialState, action: ActionReturnTypes): LocationsState {
  let byId: LocationHash = {}

  switch (action.type) {
    case Actions.FETCH_LOCATIONS:
      const ids = action.payload.locations.map((location: LocationResponse) => location._id)

      action.payload.locations.forEach((location: LocationResponse) => byId[location._id] = location)
      return { ...state, ids, byId }
      break
    case Actions.UPDATE_LOCATION:
      byId = Object.assign({}, state.byId)
      byId[action.payload.location._id] = action.payload.location

      return { ...state, byId }
      break
    default:
      return state
  }
}
