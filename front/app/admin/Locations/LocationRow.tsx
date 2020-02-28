import * as React from 'react'
import { LocationResponse } from 'frontapp/libs/api/Responses'
import Modal from 'frontapp/rcl/modal'
import LocationForm from 'frontapp/admin/Locations/LocationForm'

interface Props {
  location: LocationResponse
}

interface State {
  isModalVisible: boolean
}

class LocationRow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isModalVisible: false
    }
  }

  handleOpenModal = () => {
    this.setState({ isModalVisible: true })
  }

  handleCloseModal = () => {
    this.setState({ isModalVisible: false })
  }

  render() {
    const { location } = this.props

    return (
      <tr>
        <td>{location.name}</td>
        <td>{location.type}</td>
        <td>{location.address}</td>
        <td>{location.zipcode}</td>
        <td>
          {this.state.isModalVisible &&
            <Modal
              title="Modify Location"
              onClose={this.handleCloseModal}
            >
              <LocationForm onSuccess={this.handleCloseModal} location={location} />
            </Modal>
          }
          <button onClick={this.handleOpenModal}>Modify</button>
        </td>
      </tr>
    )
  }
}

export default LocationRow;
