import { IApplicationState } from 'frontapp/reducers'
import { Action, daysChosen, IState , View } from 'frontapp/reducers/itineraryBuilder/actionBuilders'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import DayChooser from './DayChooser'
import Itinerary from './Itinerary'

export class ItineraryBuilder extends React.Component<IState, {}> {
  constructor(props: IState) {
    super(props)

  }

  public render() {
    if (this.props.view === View.form ) {
      return <DayChooser/>
    } else {
      return <Itinerary/>
    }
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
})

export default connect(mapState, mapDispatch)(ItineraryBuilder)
