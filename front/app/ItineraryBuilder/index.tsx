import * as React from 'react'
import DayChooser from './DayChooser'
import Itinerary from './Itinerary'

interface IProps {
  stage: string
}

class ItineraryBuilder extends React.Component<IProps, {}> {
  public render() {
    if (this.props.stage === 'choose_day') {
      return <DayChooser/>
    } else {
      return <Itinerary/>
    }
  }
}

export default ItineraryBuilder
