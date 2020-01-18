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
  const { payload, type } = action

  switch (type) {
    case Actions.FETCH_LOCATIONS:
      const ids = payload.locations.map((location: LocationResponse) => location._id)
      const byId: LocationHash = {}

      payload.locations.forEach((location: LocationResponse) => byId[location._id] = location)
      return { ...state, ids, byId }
      break;
    default:
      return state
  }
}
