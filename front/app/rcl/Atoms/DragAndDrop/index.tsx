import * as React from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"

const getItemStyle = (isDragging: boolean, draggableStyle: object) => ({
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

function reorder<T>(items: T[], startIndex: number, endIndex: number): T[] {
  const changedSteps = Array.from(items)
  const [removed] = changedSteps.splice(startIndex, 1)
  changedSteps.splice(endIndex, 0, removed)

  return changedSteps
}

const draggedOutsideDroppable = ({ destination }: DropResult) => {
  return !destination
}

interface Props<T, U> {
  onChange: (items: T[]) => void
  items: T[]
  children: (item: T, index: number) => JSX.Element
  keyField: U
}

interface State { }

class DragAndDrop<T extends {}, U extends keyof T> extends React.Component<Props<T, U>, State> {

  onDragEnd = (result: DropResult) => {

    if (draggedOutsideDroppable(result)) {
      return
    }

    const items = reorder(
      this.props.items,
      result.source.index,
      result.destination.index
    )

    this.props.onChange(items)

  }

  draggableKey = (item: T) => (item[this.props.keyField] as unknown as string)

  render() {
    const { items } = this.props

    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(dropProvided, dropSnapshot) => (
              <div
                {...dropProvided.droppableProps}
                ref={dropProvided.innerRef}
                style={getListStyle(dropSnapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable key={this.draggableKey(item)} draggableId={this.draggableKey(item)} index={index}>
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
                        {this.props.children(item, index)}
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
    )
  }
}

export default DragAndDrop
