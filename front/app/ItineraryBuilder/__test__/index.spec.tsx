import { shallow } from 'enzyme'
import * as React from 'react'
import { ItineraryBuilder } from '../'
import { View } from 'frontapp/reducers/itineraryBuilder/actionBuilders'

test('ItineraryBuilder renders DayChooser', () => {
  const subject = shallow(<ItineraryBuilder view={View.form} isLoading={false} days={3} />)
  expect(subject.text()).toEqual('<DayChooser />')
})

test('ItineraryBuilder renders DayChooser', () => {
  const subject = shallow(<ItineraryBuilder view={View.itinerary} isLoading={false} days={5}/>)

  expect(subject.text()).toEqual('<Itinerary />')
})
