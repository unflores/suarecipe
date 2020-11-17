import { Step } from 'frontapp/libs/api/Responses'
import * as React from 'react'
import NoSteps from './NoSteps'

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
        <NoSteps />
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
