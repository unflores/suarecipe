import { IDay, IItineraryResponse } from 'frontapp/libs/api/Responses'

export enum Action {
  CHANGE_VIEW = 'change_view',
  LOAD_ITINERARY = 'load_itinerary',
}

export enum View {
  form = 'form',
  itinerary = 'itinerary',
}

export interface ItineraryBuilderState {
  readonly view: View
  readonly days: number
  readonly isLoading: boolean
  readonly itinerary: IDay[]
}

export const daysChosen = (days: number) => ({
  payload: {
    days,
    isLoading: true,
    view: View.itinerary,
  },
  type: Action.CHANGE_VIEW,
})

export const itineraryBuilt = ({ itinerary }: IItineraryResponse) => ({
  payload: {
    itinerary,
    view: View.itinerary,
  },
  type: Action.LOAD_ITINERARY,
})
