import Button from 'frontapp/rcl/Atoms/Button'
import * as React from 'react'

interface Props {
  onClickCreate: () => void
}

class NoSteps extends React.Component<Props, {}> {
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
