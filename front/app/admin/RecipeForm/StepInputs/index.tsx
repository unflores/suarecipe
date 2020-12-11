import { Step } from 'frontapp/libs/api/Responses'
import BasicInput from 'frontapp/rcl/Atoms/BasicInput'
import Button from 'frontapp/rcl/Atoms/Button'
import DragAndDrop from 'frontapp/rcl/Atoms/DragAndDrop'
import * as React from 'react'
import NoSteps from './NoSteps'
import * as styles from './styles.css'

interface Props {
  steps: Step[]
  onChange: (steps: Step[]) => void
  onRemove: (steps: Step[]) => void
}

interface State {

}

class StepInputs extends React.Component<Props, State> {

  handleRemoveIngredient = (step: Step) => {
    const steps = Array.from(this.props.steps)
    const index = steps.findIndex((currentStep) => currentStep._id === step._id)
    steps.splice(index, 1)
    this.props.onRemove(steps)
  }

  handleUpdateStep = ({ name, value }: { name: string, value: string }) => {
    const steps = Array.from(this.props.steps)

    const index = steps.findIndex((currentStep) => currentStep._id === name)

    steps[index].body = value

    this.props.onChange(steps)
  }

  render() {
    if (this.props.steps.length === 0) {
      return <NoSteps />
    }
    const { steps } = this.props

    return (
      <>
        <label>Steps: </label>
        <div>
          <DragAndDrop
            onChange={this.props.onChange}
            items={steps}
            keyField="_id"
          >
            {(step, index) => (
              <div className={styles.step}>
                <div className={styles.body}>
                  <BasicInput
                    name={step._id}
                    value={step.body}
                    onChange={this.handleUpdateStep}
                  />
                </div>
                <Button
                  text="X"
                  type="danger"
                  onClick={() => (this.handleRemoveIngredient(step))}
                />
              </div>
            )}
          </DragAndDrop>
        </div>
      </>
    )
  }
}

export default StepInputs
