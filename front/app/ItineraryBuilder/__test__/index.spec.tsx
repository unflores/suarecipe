import { shallow } from 'enzyme'
import { IItineraryResponse } from 'frontapp/libs/api/Responses'
import { View } from 'frontapp/reducers/itineraryBuilder/actionBuilders'
import * as React from 'react'
import { ItineraryBuilder } from '../'

const onChosenStub = (num: number) => ({})
const onBuildItineraryStub = (itineraryResponse: IItineraryResponse) => ({})

describe('ItineraryBuilder', () => {
  test('renders DayChooser initially', () => {
    const subject = shallow(
      <ItineraryBuilder
        days={3}
        isLoading={false}
        itinerary={[]}
        onChosen={onChosenStub}
        onBuildItinerary={onBuildItineraryStub}
        view={View.form}
      />,
    )
    expect(subject.text()).toEqual('<DayChooser />')
  })

  test('renders Itinerary after day has been chosen', () => {
    const subject = shallow(
      <ItineraryBuilder
        onChosen={onChosenStub}
        onBuildItinerary={onBuildItineraryStub}
        view={View.itinerary}
        isLoading={false}
        itinerary={[]}
        days={5}
      />,
    )

    expect(subject.text()).toEqual('<Itinerary />')
  })
})
