import * as React from 'react'
import { LocationResponse } from 'frontapp/libs/api/Responses'
import { connect } from 'react-redux'
import { locationUpdated } from 'frontapp/reducers/locations/actionBuilders'
import BasicInput from 'frontapp/rcl/BasicInput'
import Button from 'frontapp/rcl/Button'
import api from 'frontapp/api'
import { Dispatch } from 'redux'

interface Props {
  onSuccess: () => void
  location: LocationResponse
  onUpdateLocation: (arg0: LocationResponse) => {}
}

interface State {
  location: LocationResponse
}

class LocationForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      location: props.location
    }
  }

  updateObject = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget
    const stateChange: { [k: string]: string } = {}
    stateChange[name] = value

    this.setState({
      location: { ...this.state.location, ...stateChange }
    })
  }

  handleSubmit = async () => {
    const location = this.state.location

    const response = await api.put<LocationResponse>(`/api/locations/${location._id}`, {
      name: location.name,
      zipcode: location.zipcode
    })

    if (response.code >= 400) {
      console.log("There was an error setting your information")
    } else {
      this.props.onUpdateLocation(response.data)
      this.props.onSuccess()
    }
  }

  render() {
    const { location } = this.state
    return (
      <form>
        <BasicInput
          labelText="Name: "
          id={location._id}
          name="name"
          value={location.name}
          onChange={this.updateObject}
        />

        <BasicInput
          labelText="Zip code:"
          id={location.zipcode.toString()}
          type="number"
          name="zipcode"
          value={location.zipcode.toString()}
          onChange={this.updateObject}
        />

        <Button onClick={this.handleSubmit} />
      </form >
    )
  }

}

const mapDispatch = (dispatch: Dispatch) => ({
  onUpdateLocation: (location: LocationResponse) => {
    dispatch(locationUpdated(location))
  }
})

export default connect(
  () => ({}),
  mapDispatch,
)(LocationForm)
