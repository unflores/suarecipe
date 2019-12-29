import * as React from 'react'

interface ProtoProps {
  location: { [s: string]: string | number }
}

const LocationRow = ({ location }: ProtoProps) => {
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
