import { Step } from 'frontapp/libs/api/Responses'
import * as React from 'react'

interface Props {
  steps: Step[]
}

interface State {

}

class StepsInput extends React.Component<Props, State> {
  render() {
    console.log(this.props.steps)
    if (this.props.steps.length === 0) {
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
    } else {
      return (
        <>
          <label>Steps: </label>
          <ol>
            {this.props.steps.map((step) => (
              <li key={step.body}>{step.body}</li>
            ))}
          </ol>
        </>
      )
    }
  }
}

export default StepsInput
