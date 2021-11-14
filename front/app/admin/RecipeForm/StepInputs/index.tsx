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
                <div className={styles.moveButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                  </svg>
                </div>
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
