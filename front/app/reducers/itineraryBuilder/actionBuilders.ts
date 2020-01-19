import { IItineraryResponse } from 'frontapp/libs/api/Responses'
import { IDay } from 'frontapp/libs/api/Responses'

export const CHANGE_VIEW = 'change_view'
export const LOAD_ITINERARY = 'load_itinerary'

export enum View {
  form = 'form',
  itinerary = 'itinerary',
}

interface DaysChosenReturn {
  payload: {
    days: number
    isLoading: boolean
    view: View
  },
  type: typeof CHANGE_VIEW
}
export const daysChosen = (days: number): DaysChosenReturn => ({
  payload: {
    days,
    isLoading: true,
    view: View.itinerary,
  },
  type: CHANGE_VIEW,
})

interface ItineraryBuiltReturn {
  payload: {
    itinerary: IDay[],
    view: View
  },
  type: typeof LOAD_ITINERARY
}
export const itineraryBuilt = ({ itinerary }: IItineraryResponse) => ({
  payload: {
    itinerary,
    view: View.itinerary,
  },
  type: LOAD_ITINERARY,
})

export type ActionReturnType = DaysChosenReturn | ItineraryBuiltReturn | { type: '@@init', payload: {} }
