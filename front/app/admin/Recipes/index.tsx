import * as React from 'react'
import { IApplicationState } from 'frontapp/reducers'
import RecipeRow from './RecipeRow'
import { connect } from 'react-redux'
import api from 'frontapp/api'
import { Recipe, RecipesResponse } from 'frontapp/libs/api/Responses'
import Table from 'frontapp/rcl/Table'
import Search from 'frontapp/rcl/Search'
import { recipesFetched } from 'frontapp/reducers/recipes/actionBuilders'
import { Dispatch } from 'redux'

interface Props {
  recipes: Recipe[]
  onFetchRecipes: (response: RecipesResponse) => void
}

const transformToSearchResults = (recipes: Recipe[]) => {
  return recipes.map((recipe) => ({
    id: recipe._id,
    value: recipe.name
  }))
}

class Recipes extends React.Component<Props, {}> {

  async componentDidMount() {
    const recipesResponse = await api.get<RecipesResponse>('/api/recipes/')

    this.props.onFetchRecipes(recipesResponse.data)
    return recipesResponse.data
  }

  searchRecipe = async (searchText: string) => {
    const recipesResponse = await api.get<RecipesResponse>('/api/recipes/',
      { search: searchText }
    )
    this.props.onFetchRecipes(recipesResponse.data)
    return transformToSearchResults(recipesResponse.data.recipes)
  }

  render() {

    return (
      <>
        <h3>Recipes</h3>

        <Search
          onSearch={this.searchRecipe}
        />

        <Table
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
        </Table>
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
