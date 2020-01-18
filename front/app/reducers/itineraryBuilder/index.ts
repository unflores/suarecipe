import { CHANGE_VIEW, LOAD_ITINERARY, ActionReturnType, View } from './actionBuilders'
import { IDay } from 'frontapp/libs/api/Responses'
export interface ItineraryBuilderState {
  readonly view: View
  readonly days: number
  readonly isLoading: boolean
  readonly itinerary: IDay[]
}

export const initialState: ItineraryBuilderState = {
  days: 3,
  isLoading: false,
  itinerary: [],
  view: View.form,
}

interface IAction {
  type: string
  payload: any
}

export default function reduce(state: ItineraryBuilderState = initialState, action: ActionReturnType): ItineraryBuilderState {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        days: action.payload.days,
        view: action.payload.view
      }
      break
    case LOAD_ITINERARY:

      return {
        ...state,
        itinerary: action.payload.itinerary
      }
      break
    default:
      return state
  }
}
