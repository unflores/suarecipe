import { IDay, IItineraryResponse } from 'frontapp/libs/api/Responses'
import * as React from 'react'

interface IDayProps {
  day: IDay
  dayNumber: number
}

interface IItineraryProps {
  itinerary: IDay[]
}

const Day = ({ day, dayNumber }: IDayProps) => {
  return (
    <div>
      <h2>Day {dayNumber}</h2>
      <h3>Morning - {day.morning.name}</h3>
      <p>{day.morning.description}</p>
      <ul>
        <li>
          <a href={day.morning.siteLink}>website</a> |
          {/*<strong> Price: 12 euros</strong> |*/}
          {day.morning.address}
        </li>
      </ul>

      <h3>Evening - {day.evening.name}</h3>
      <p>{day.evening.description}</p>
      <ul>
        <li>
          <a href={day.evening.siteLink}>website</a> |
          {/*<strong> Price: 12 euros</strong> |*/}
          {day.evening.address}
        </li>
      </ul>
    </div>
  )
}

const Days = ({ itinerary }: IItineraryProps) => {
  const days = itinerary.map((day, index) => (
    <Day key={index} day={day} dayNumber={index + 1} />
  ))
  return <div>{days}</div>
}

class Itinerary extends React.Component<IItineraryProps, {}> {
  constructor(props: IItineraryProps) {
    super(props)
  }

  public render() {
    const { itinerary } = this.props

    return <Days itinerary={itinerary} />
  }
}

export default Itinerary
