import api from 'frontapp/api'
import { Recipe, RecipesResponse } from 'frontapp/libs/api/Responses'
import Search from 'frontapp/rcl/Search'
import Table from 'frontapp/rcl/Table'
import { ApplicationState } from 'frontapp/reducers'
import { recipesFetched } from 'frontapp/reducers/recipes/actionBuilders'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import RecipeRow from './RecipeRow'

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
    const recipesResponse = await api.get<RecipesResponse>('/api/book/recipes/')

    this.props.onFetchRecipes(recipesResponse.data)
    return recipesResponse.data
  }

  searchRecipe = async (searchText: string) => {
    const recipesResponse = await api.get<RecipesResponse>('/api/book/recipes/',
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

const mapState = ({ recipes }: ApplicationState) => ({
  recipes: Object.values(recipes.byId)
})

const mapDispatch = (dispatch: Dispatch) => ({
  onFetchRecipes: (response: RecipesResponse) => {
    dispatch(recipesFetched(response))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Recipes)
