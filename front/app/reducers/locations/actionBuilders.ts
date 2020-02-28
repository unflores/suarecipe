import { LocationResponse } from 'frontapp/libs/api/Responses'

export enum Actions {
  FETCH_LOCATIONS = 'fetch_locations',
  UPDATE_LOCATION = 'update_location'
}

interface locationsFetchedReturn {
  payload: {
    locations: LocationResponse[]
  },
  type: typeof Actions.FETCH_LOCATIONS
}

export const locationsFetched = (locations: LocationResponse[]): locationsFetchedReturn => ({
  payload: {
    locations
  },
  type: Actions.FETCH_LOCATIONS
})

interface locationUpdatedReturn {
  payload: {
    location: LocationResponse
  },
  type: typeof Actions.UPDATE_LOCATION
}

export const locationUpdated = (location: LocationResponse): locationUpdatedReturn => ({
  payload: {
    location
  },
  type: Actions.UPDATE_LOCATION
})


export type ActionReturnTypes = locationUpdatedReturn | locationsFetchedReturn
