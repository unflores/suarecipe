import { IItineraryResponse } from 'frontapp/libs/api/Responses'
import Endpoints from 'frontapp/libs/api/Routes'
import { IApplicationState } from 'frontapp/reducers'
import {
  Action,
  daysChosen,
  IState,
  itineraryBuilt,
  View,
} from 'frontapp/reducers/itineraryBuilder/actionBuilders'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import DayChooser from './DayChooser'
import Itinerary from './Itinerary'

interface IItineraryBuilder extends IState {
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

  private handleChosenDays = (days: number) => {
    this.props.onChosen(days)

    Endpoints.create('itineraries', {}, { days }).then(itineraryResponse => {
      this.props.onBuildItinerary(itineraryResponse as IItineraryResponse)
    })
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
