import * as React from 'react'
import Form from 'frontapp/rcl/Form'
import BasicInput from 'frontapp/rcl/BasicInput'

interface Props {
  recipeId: string
}

interface Ingredient {
  ingredientId: string
  quantity: number
  measurement: string
}

interface State {
  recipe: {
    name: string,
    usedIngredients: Ingredient[]
  }
}

class EditRecipe extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      recipe: {
        name: '',
        usedIngredients: [],

      }
    }
  }

  handleSubmit = () => {

  }

  updateObject = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget
    const stateChange: { [k: string]: string } = {}
    stateChange[name] = value

    this.setState({
      recipe: { ...this.state.recipe, ...stateChange }
    })
  }

  render() {
    const { recipe } = this.state

    return (
      <>
        <Form
          handleSubmit={this.handleSubmit}
        >
          <BasicInput
            labelText="Name: "
            id={recipe.name}
            name="name"
            value={recipe.name}
            onChange={this.updateObject}
          />
        </Form >
      </>
    )
  }
}

export default EditRecipe
