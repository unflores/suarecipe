import * as React from 'react'
import { IngredientResponse } from 'frontapp/libs/api/Responses'
import { connect } from 'react-redux'
import { ingredientUpdated } from 'frontapp/reducers/ingredients/actionBuilders'
import BasicInput from 'frontapp/rcl/BasicInput'
import Button from 'frontapp/rcl/Button'
import api from 'frontapp/api'
import { Dispatch } from 'redux'

interface Props {
  onSuccess: () => void
  ingredient: IngredientResponse
  onUpdateIngredient: (arg0: IngredientResponse) => {}
}

interface State {
  ingredient: IngredientResponse
}

class IngredientForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      ingredient: props.ingredient
    }
  }

  updateObject = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget
    const stateChange: { [k: string]: string } = {}
    stateChange[name] = value

    this.setState({
      ingredient: { ...this.state.ingredient, ...stateChange }
    })
  }

  handleSubmit = async () => {
    const ingredient = this.state.ingredient

    const response = await api.put<IngredientResponse>(`/api/ingredients/${ingredient._id}`, {
      name: ingredient.name,
      zipcode: ingredient.zipcode
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
      <form>
        <BasicInput
          labelText="Name: "
          id={ingredient._id}
          name="name"
          value={ingredient.name}
          onChange={this.updateObject}
        />

        <BasicInput
          labelText="Zip code:"
          id={ingredient.zipcode.toString()}
          type="number"
          name="zipcode"
          value={ingredient.zipcode.toString()}
          onChange={this.updateObject}
        />

        <Button onClick={this.handleSubmit} />
      </form >
    )
  }

}

const mapDispatch = (dispatch: Dispatch) => ({
  onUpdateIngredient: (ingredient: IngredientResponse) => {
    dispatch(ingredientUpdated(ingredient))
  }
})

export default connect(
  () => ({}),
  mapDispatch,
)(IngredientForm)
