import * as React from 'react'
import { LocationResponse } from 'frontapp/libs/api/Responses'
interface Props {
  location: LocationResponse
}

const LocationRow = ({ location }: Props) => {
  return (
    <tr>
      <td>{location.name}</td>
      <td>{location.type}</td>
      <td>{location.address}</td>
      <td>{location.zipcode}</td>
      <td></td>
    </tr>
  )
}

export default LocationRow;
