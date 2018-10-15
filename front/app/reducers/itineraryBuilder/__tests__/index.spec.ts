import { initialState } from '../'
import { View, daysChosen } from '../actionBuilders'
import reduce from '../'

describe('Reducers#itineraryBuilder', () => {
  test('should initialize state', () => {
    expect(reduce(undefined, {type: '@@init', payload:{}})).toEqual(initialState)
  })

  test('should change the view with new days', () => {
    expect(reduce(initialState, daysChosen(4))).toEqual({days: 4, isLoading: false, view: View.itinerary})
  })
})
