import api from 'frontapp/api'
import { Step, StepResponse } from 'frontapp/libs/api/Responses'
import { log } from 'frontapp/libs/logger'
import BasicInput from 'frontapp/rcl/Atoms/BasicInput'
import Button from 'frontapp/rcl/Atoms/Button'
import DragAndDrop from 'frontapp/rcl/Atoms/DragAndDrop'
import * as React from 'react'
import NoSteps from './NoSteps'
import * as styles from './styles.css'

interface Props {
  recipeId: string
  steps: Step[]
  onChange: (steps: Step[]) => void
  onRemove: (steps: Step[]) => void
}

class StepInputs extends React.Component<Props, {}> {

  handleRemoveStep = (step: Step) => {
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

  createStep = async () => {
    const steps = Array.from(this.props.steps)
    const response = await api.post<StepResponse>(
      `/api/admin/recipes/${this.props.recipeId}/steps`,
      { step: { body: "New Step" } }
    )

    if (response.code >= 400) {
      log('error', "There was an error setting your information")
    }

    this.props.onChange([response.data.step].concat(steps))
  }

  render() {
    if (this.props.steps.length === 0) {
      return <NoSteps onClickCreate={this.createStep} />
    }
    const { steps } = this.props

    return (
      <>
        <label>Steps: </label>
        <div>
          <Button
            text="Add Step"
            onClick={this.createStep}
          />
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
                  onClick={() => (this.handleRemoveStep(step))}
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
