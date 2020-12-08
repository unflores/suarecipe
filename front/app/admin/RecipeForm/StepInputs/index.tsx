import { Step } from 'frontapp/libs/api/Responses'
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
            {(step) => (
              <div>
                <div className={styles.body}>
                  {step.body}
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
