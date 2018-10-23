import { initialState } from '../'
import reduce from '../'
import { daysChosen, View } from '../actionBuilders'

describe('Reducers#itineraryBuilder', () => {
  test('should initialize state', () => {
    expect(reduce(undefined, {type: '@@init', payload: {}})).toEqual(initialState)
  })

  test('should change the view with new days', () => {
    expect(reduce(initialState, daysChosen(4))).toEqual({days: 4, isLoading: false, view: View.itinerary})
  })
})
