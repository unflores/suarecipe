import * as React from 'react'
import { Ingredient } from 'frontapp/libs/api/Responses'
import { connect } from 'react-redux'
import { ingredientUpdated } from 'frontapp/reducers/ingredients/actionBuilders'
import BasicInput from 'frontapp/rcl/Atoms/BasicInput'
import Form from 'frontapp/rcl/Form'
import api from 'frontapp/api'
import { Dispatch } from 'redux'

interface Props {
  onSuccess: () => void
  ingredient: Ingredient
  onUpdateIngredient: (arg0: Ingredient) => {}
}

interface State {
  ingredient: Ingredient
}

const ENTER_KEY = 13

class IngredientForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      ingredient: props.ingredient
    }
  }

  updateObject = (namevalue: { name: string, value: string }) => {
    this.setState({
      ingredient: { ...this.state.ingredient, ...namevalue }
    })
  }

  handleSubmit = async () => {
    const ingredient = this.state.ingredient

    const response = await api.put<Ingredient>(`/api/ingredients/${ingredient._id}`, {
      name: ingredient.name
    })

    if (response.code >= 400) {
      console.log("There was an error setting your information")
    } else {
      this.props.onUpdateIngredient(response.data)
      this.props.onSuccess()
    }
  }

  render() {
    const { ingredient } = this.state
    return (
      <Form
        handleSubmit={this.handleSubmit}
      >
        <BasicInput
          labelText="Name: "
          id={ingredient._id}
          name="name"
          value={ingredient.name}
          onChange={this.updateObject}
        />
      </Form >
    )
  }

}

const mapDispatch = (dispatch: Dispatch) => ({
  onUpdateIngredient: (ingredient: Ingredient) => {
    dispatch(ingredientUpdated(ingredient))
  }
})

export default connect(
  () => ({}),
  mapDispatch,
)(IngredientForm)
