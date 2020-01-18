import * as React from 'react'
import LocationRow from './LocationRow'
import { IApplicationState } from 'frontapp/reducers'
import { connect } from 'react-redux'
import api from 'frontapp/api'
import { LocationResponse } from 'frontapp/libs/api/Responses'
import { locationsFetched } from 'frontapp/reducers/locations/actionBuilders'
import { Dispatch } from 'redux'


interface Props {
  onFetchLocations: (locations: LocationResponse[]) => void
  locations: LocationResponse[]
}

class Locations extends React.Component<Props, {}> {

  async componentDidMount() {
    const locationsResponse = await api.get<LocationResponse[]>('/api/locations/')

    this.props.onFetchLocations(locationsResponse.data)
  }

  render() {
    return (
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Address</th>
            <th scope="col">Zipcode</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {
            this.props.locations.map((location) =>
              <LocationRow
                key={location._id}
                location={location}
              />
            )
          }
        </tbody>
      </table>
    )
  }
}

const mapState = ({ locations }: IApplicationState) => ({
  locations: Object.values(locations.byId)
})

const mapDispatch = (dispatch: Dispatch) => ({
  onFetchLocations: (locations: LocationResponse[]) => {
    dispatch(locationsFetched(locations))
  }
})

export default connect(
  mapState,
  mapDispatch,
)(Locations)
