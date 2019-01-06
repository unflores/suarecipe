import { Action, daysChosen, IState, View } from './actionBuilders'

export const initialState: IState = {
  days: 3,
  isLoading: false,
  itinerary: [],
  view: View.form,
}

interface IAction {
  type: string
  payload: any
}

export default function reduce(state: IState = initialState, action: IAction) {
  const { payload, type } = action

  switch (type) {
    case Action.CHANGE_VIEW:
      return { ...state, days: payload.days, view: payload.view }
      break
    case Action.LOAD_ITINERARY:
      const { itinerary } = payload
      return { ...state, itinerary }
      break
    default:
      return state
  }
}
