export enum Action {
  CHANGE_VIEW = 'change_view',
}

export enum View {
  form = "form",
  itinerary = "itinerary",
}

export interface IState {
  readonly view: View,
  readonly days: number,
  readonly isLoading: boolean,
}

export const daysChosen = (days: number) => ({
  payload: {
    days,
    isLoading: true,
    view: View.itinerary,
  },
  type: Action.CHANGE_VIEW,
})
