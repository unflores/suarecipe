
import * as React from 'react'
import Button from 'frontapp/rcl/Atoms/Button'

interface Props {
  onClickCreate: () => void
}

interface State {

}

class NoSteps extends React.Component<Props, State> {
  render() {
    return (
      <>
        <div className="row">
          <div className="col-5">
            <label>Steps: </label>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            No steps... Add some.
          </div>
          <div className="col-5">
            <Button
              text="Add Step"
              onClick={this.props.onClickCreate}
            /></div>
        </div>
      </>
    )
  }
}

export default NoSteps
