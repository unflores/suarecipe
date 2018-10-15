import { shallow } from 'enzyme'
import { View } from 'frontapp/reducers/itineraryBuilder/actionBuilders'
import * as React from 'react'
import { ItineraryBuilder } from '../'

describe('ItineraryBuilder', () => {
  test('renders DayChooser initially', () => {
    const subject = shallow(<ItineraryBuilder onChosen={(num: number) => {}} view={View.form} isLoading={false} days={3} />)
    expect(subject.text()).toEqual('<DayChooser />')
  })

  test('renders Itinerary after day has been chosen', () => {
    const subject = shallow(<ItineraryBuilder onChosen={(num: number) => {}} view={View.itinerary} isLoading={false} days={5}/>)

    expect(subject.text()).toEqual('<Itinerary />')
  })
})
