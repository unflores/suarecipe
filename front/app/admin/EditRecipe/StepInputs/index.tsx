import { Step } from 'frontapp/libs/api/Responses'
import Button from 'frontapp/rcl/Atoms/Button'
import * as React from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import NoSteps from './NoSteps'

interface Props {
  steps: Step[]
  onChange: (steps: Step[]) => void
  onRemove: (steps: Step[]) => void
}

interface State {

}

const getItemStyle = (isDragging: boolean, draggableStyle: object) => ({
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
})

const grid = 8

const reorder = (steps: Step[], startIndex: number, endIndex: number) => {
  const changedSteps = Array.from(steps)
  const [removed] = changedSteps.splice(startIndex, 1)
  changedSteps.splice(endIndex, 0, removed)

  return changedSteps
}

class StepsInput extends React.Component<Props, State> {

  onDragEnd = (result: DropResult) => {

    // dropped outside the list
    if (!result.destination) {
      return
    }

    const steps = reorder(
      this.props.steps,
      result.source.index,
      result.destination.index
    )

    this.props.onChange(steps)

  }

  handleRemoveIngredient = (removeIndex: number) => {
    const steps = Array.from(this.props.steps)
    steps.splice(removeIndex, 1)
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
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(dropProvided, dropSnapshot) => (
                <div
                  {...dropProvided.droppableProps}
                  ref={dropProvided.innerRef}
                  style={getListStyle(dropSnapshot.isDraggingOver)}
                >
                  {steps.map((step, index) => (
                    <Draggable key={step.body} draggableId={step.body} index={index}>
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          style={getItemStyle(
                            dragSnapshot.isDragging,
                            dragProvided.draggableProps.style
                          )}
                        >
                          {step.body}
                          <Button
                            text="X"
                            type="danger"
                            onClick={() => (this.handleRemoveIngredient(index))}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </>
    )
  }
}

export default StepsInput
