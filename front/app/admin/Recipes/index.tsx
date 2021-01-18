import api from 'frontapp/api'
import { Recipe, RecipeResponse, RecipesResponse } from 'frontapp/libs/api/Responses'
import Button from 'frontapp/rcl/Atoms/Button'
import Search from 'frontapp/rcl/Search'
import Table from 'frontapp/rcl/Table'
import { ApplicationState } from 'frontapp/reducers'
import { recipesFetched } from 'frontapp/reducers/recipes/actionBuilders'
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Dispatch } from 'redux'
import RecipeRow from './RecipeRow'

interface Props {
  recipes: Recipe[]
  onFetchRecipes: (response: RecipesResponse) => void
}

interface State {
  redirectId: string
}

const transformToSearchResults = (recipes: Recipe[]) => {
  return recipes.map((recipe) => ({
    id: recipe._id,
    value: recipe.name
  }))
}

class Recipes extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      redirectId: undefined
    }
  }

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

  handleCreateRecipe = async () => {
    const recipeResponse = await api.post<RecipeResponse>('/api/recipes/',
      { recipe: { name: 'New Recipe' } }
    )
    this.setState({ redirectId: recipeResponse.data.recipe._id })
  }

  render() {

    if (this.state.redirectId) {
      return <Redirect to={`/admin/recipes/${this.state.redirectId}/edit`} />
    }

    return (
      <>
        <h3>
          Recipes
          <Button
            text="New Recipe"
            onClick={this.handleCreateRecipe}
          />
        </h3>

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
