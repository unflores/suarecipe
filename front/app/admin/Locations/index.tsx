import * as React from 'react'
import LocationRow from './LocationRow'
import Endpoints from 'frontapp/libs/api/Routes'
import { IApplicationState } from 'frontapp/reducers'
import { connect } from 'react-redux'

interface Props {

}

const locations = [
  { _id: '1234', name: 'name', type: 'type', address: 'address', siteLink: 'sitelink', zipcode: 75010 }
]

class Locations extends React.Component<Props, {}> {


  async componentDidMount() {
    locationResponse = await Endpoints.list('locations')
    this.props.onFetchLocations(locationsResponse)
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
            locations.map((location) =>
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

const mapState = ({
  locations,
}: IApplicationState) => ({
  locations
})

const mapDispatch = (dispatch: Dispatch) => ({
  onFetchLocations: (locationsResponse: ILocationsResponse) => {
    dispatch(locationsFetched(locationsResponse))
  }
})

export default connect(
  mapState,
  mapDispatch,
)(Locations)
