import { LocationResponse } from 'frontapp/libs/api/Responses'

export enum Actions {
  FETCH_LOCATIONS = 'fetch_locations'
}

export const locationsFetched = (locations: LocationResponse[]) => ({
  payload: {
    locations
  },
  type: Actions.FETCH_LOCATIONS
})


export type ActionReturnTypes = ReturnType<typeof locationsFetched>
