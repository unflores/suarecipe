import api from 'frontapp/api'
import { Ingredient, IngredientsResponse } from 'frontapp/libs/api/Responses'
import Table from 'frontapp/rcl/Table'
import { IApplicationState } from 'frontapp/reducers'
import { ingredientsFetched } from 'frontapp/reducers/ingredients/actionBuilders'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import IngredientRow from './IngredientRow'

interface Props {
  onFetchIngredients: (ingredients: Ingredient[]) => void
  ingredients: Ingredient[]
}

class Ingredients extends React.Component<Props, {}> {

  async componentDidMount() {
    const ingredientsResponse = await api.get<IngredientsResponse>('/api/ingredients/')
    this.props.onFetchIngredients(ingredientsResponse.data.ingredients)
  }

  render() {
    return (
      <>
        <h3>Ingredients</h3>
        <Table
          headers={['Name', '',]}
        >
          {
            this.props.ingredients.map((ingredient) =>
              <IngredientRow
                key={ingredient._id}
                ingredient={ingredient}
              />
            )
          }
        </Table>
      </>
    )
  }
}

const mapState = ({ ingredients }: IApplicationState) => ({
  ingredients: Object.values(ingredients.byId)
})

const mapDispatch = (dispatch: Dispatch) => ({
  onFetchIngredients: (ingredients: Ingredient[]) => {
    dispatch(ingredientsFetched(ingredients))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Ingredients)
