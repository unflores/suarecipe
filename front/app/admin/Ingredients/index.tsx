import * as React from 'react'
import IngredientRow from './IngredientRow'
import { IApplicationState } from 'frontapp/reducers'
import { connect } from 'react-redux'
import api from 'frontapp/api'
import AdminTable from 'frontapp/rcl/AdminTable'
import { IngredientsResponse, Ingredient } from 'frontapp/libs/api/Responses'
import { ingredientsFetched } from 'frontapp/reducers/ingredients/actionBuilders'
import { Dispatch } from 'redux'


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
        <AdminTable
          headers={['Name', '']}
        >
          {
            this.props.ingredients.map((ingredient) =>
              <IngredientRow
                key={ingredient._id}
                ingredient={ingredient}
              />
            )
          }
        </AdminTable>
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
  mapDispatch,
)(Ingredients)
