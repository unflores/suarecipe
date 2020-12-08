import { Step } from 'frontapp/libs/api/Responses'
import BasicInput from 'frontapp/rcl/Atoms/BasicInput'
import Button from 'frontapp/rcl/Atoms/Button'
import DragAndDrop from 'frontapp/rcl/Atoms/DragAndDrop'
import * as React from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
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
    const index = steps.findIndex((currentStep) => currentStep.body === step.body)
    steps.splice(index, 1)
    this.props.onRemove(steps)
  }

  handleUpdateStep = ({ name, value }: { name: string, value: string }) => {
    const steps = Array.from(this.props.steps)

    const index = parseInt(name.split("body-").slice(-1).pop(), 10)

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
            keyField="body"
          >
            {(step, index) => (
              <div className={styles.step}>
                <div className={styles.body}>
                  <BasicInput
                    name={`body-${index}`}
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
