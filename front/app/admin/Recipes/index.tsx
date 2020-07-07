import * as React from 'react'
import { IApplicationState } from 'frontapp/reducers'
import RecipeRow from './RecipeRow'
import { connect } from 'react-redux'
import api from 'frontapp/api'
import { Recipe, RecipesResponse } from 'frontapp/libs/api/Responses'
import AdminTable from 'frontapp/rcl/AdminTable'
import { recipesFetched } from 'frontapp/reducers/recipes/actionBuilders'
import { Dispatch } from 'redux'

interface Props {
  recipes: Recipe[]
  onFetchRecipes: (response: RecipesResponse) => void
}

class Recipes extends React.Component<Props, {}> {

  async componentDidMount() {
    const recipesResponse = await api.get<RecipesResponse>('/api/recipes/')

    this.props.onFetchRecipes(recipesResponse.data)
  }

  render() {
    return (
      <>
        <h3>Recipes</h3>
        <AdminTable
          headers={['Name', '']}
        >
          {
            this.props.recipes.map((recipe) =>
              <RecipeRow
                key={recipe._id}
                recipe={recipe}
              />
            )
          }
        </AdminTable>
      </>
    )
  }
}

const mapState = ({ recipes }: IApplicationState) => ({
  recipes: Object.values(recipes.byId)
})

const mapDispatch = (dispatch: Dispatch) => ({
  onFetchRecipes: (response: RecipesResponse) => {
    dispatch(recipesFetched(response))
  }
})

export default connect(
  mapState,
  mapDispatch,
)(Recipes)
