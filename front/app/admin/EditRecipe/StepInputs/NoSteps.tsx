
import * as React from 'react'

interface Props {
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
          <div className="col-5"><button>Add Step</button></div>
        </div>
      </>
    )
  }
}

export default NoSteps
