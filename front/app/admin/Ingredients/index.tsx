import * as React from 'react'
import IngredientRow from './IngredientRow'
import { IApplicationState } from 'frontapp/reducers'
import { connect } from 'react-redux'
import api from 'frontapp/api'
import { IngredientResponse } from 'frontapp/libs/api/Responses'
import { ingredientsFetched } from 'frontapp/reducers/ingredients/actionBuilders'
import { Dispatch } from 'redux'


interface Props {
  onFetchIngredients: (ingredients: IngredientResponse[]) => void
  ingredients: IngredientResponse[]
}

class Ingredients extends React.Component<Props, {}> {

  async componentDidMount() {
    const ingredientsResponse = await api.get<IngredientResponse[]>('/api/ingredients/')

    this.props.onFetchIngredients(ingredientsResponse.data)
  }

  render() {
    return (
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Address</th>
            <th scope="col">Zipcode</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {
            this.props.ingredients.map((ingredient) =>
              <IngredientRow
                key={ingredient._id}
                ingredient={ingredient}
              />
            )
          }
        </tbody>
      </table>
    )
  }
}

const mapState = ({ ingredients }: IApplicationState) => ({
  ingredients: Object.values(ingredients.byId)
})

const mapDispatch = (dispatch: Dispatch) => ({
  onFetchIngredients: (ingredients: IngredientResponse[]) => {
    dispatch(ingredientsFetched(ingredients))
  }
})

export default connect(
  mapState,
  mapDispatch,
)(Ingredients)
