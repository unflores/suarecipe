import DayChooser from './DayChooser'
import { IItineraryResponse } from 'frontapp/libs/api/Responses'
import Endpoints from 'frontapp/libs/api/Routes'
import { IApplicationState } from 'frontapp/reducers'
import { Action, itineraryBuilt, daysChosen, IState , View } from 'frontapp/reducers/itineraryBuilder/actionBuilders'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
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
    if (this.props.view === View.form ) {
      return <DayChooser handleChosenDays={this.handleChosenDays} />
    } else {
      return <Itinerary/>
    }
  }

  private handleChosenDays = (days: number) => {
    this.props.onChosen(days)

    Endpoints.create('itineraries', {}, {days})
      .then((itineraryResponse) => {
        this.props.onBuildItinerary(itineraryResponse)
      })

  }
}

const mapState = ({itineraryBuilder: {days, isLoading, view}}: IApplicationState) => ({
  days,
  isLoading,
  view,
})

const mapDispatch = (dispatch: Dispatch) => ({
  onChosen: (days: number) => {
    dispatch(daysChosen(days))
  },
  onBuildItinerary: (itineraryResponse: IItineraryResponse) => {
    dispatch(itineraryBuilt(itineraryResponse))
  }
})

export default connect(mapState, mapDispatch)(ItineraryBuilder)
