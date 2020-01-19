import { IItineraryResponse } from 'frontapp/libs/api/Responses'
import { IApplicationState } from 'frontapp/reducers'
import {
  daysChosen,
  itineraryBuilt,
  View,
} from 'frontapp/reducers/itineraryBuilder/actionBuilders'
import { ItineraryBuilderState } from 'frontapp/reducers/itineraryBuilder'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import DayChooser from './DayChooser'
import Itinerary from './Itinerary'
import api from 'frontapp/api'

interface IItineraryBuilder extends ItineraryBuilderState {
  onChosen: (days: number) => void
  onBuildItinerary: (itineraryResponse: IItineraryResponse) => void
}

export class ItineraryBuilder extends React.Component<IItineraryBuilder, {}> {
  constructor(props: IItineraryBuilder) {
    super(props)
  }

  public render() {
    if (this.props.view === View.form) {
      return <DayChooser handleChosenDays={this.handleChosenDays} />
    } else {
      return <Itinerary itinerary={this.props.itinerary} />
    }
  }

  private handleChosenDays = async (days: number) => {
    this.props.onChosen(days)

    const response = await api.post<IItineraryResponse>('/api/itineraries', { days })
    this.props.onBuildItinerary(response.data)
  }
}

const mapState = ({
  itineraryBuilder: { days, isLoading, view, itinerary },
}: IApplicationState) => ({
  days,
  isLoading,
  itinerary,
  view,
})

const mapDispatch = (dispatch: Dispatch) => ({
  onBuildItinerary: (itineraryResponse: IItineraryResponse) => {
    dispatch(itineraryBuilt(itineraryResponse))
  },
  onChosen: (days: number) => {
    dispatch(daysChosen(days))
  },
})

export default connect(
  mapState,
  mapDispatch,
)(ItineraryBuilder)
