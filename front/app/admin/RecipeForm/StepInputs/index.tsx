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

const getItemStyle = (isDragging: boolean, draggableStyle: object) => ({
  display: 'flex',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "#fff",
  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: `40rem`
})

const grid = 8

const reorder = (steps: Step[], startIndex: number, endIndex: number) => {
  const changedSteps = Array.from(steps)
  const [removed] = changedSteps.splice(startIndex, 1)
  changedSteps.splice(endIndex, 0, removed)

  return changedSteps
}

const draggedOutsideDroppable = ({ destination }: DropResult) => {
  return !destination
}

class StepInputs extends React.Component<Props, State> {

  onDragEnd = (result: DropResult) => {

    if (draggedOutsideDroppable(result)) {
      return
    }

    const steps = reorder(
      this.props.steps,
      result.source.index,
      result.destination.index
    )

    this.props.onChange(steps)

  }

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
