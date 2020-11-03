import api, { mergeIntersect } from 'frontapp/api'
import { Recipe, RecipeResponse } from 'frontapp/libs/api/Responses'
import { Ingredient, IngredientsResponse, UsedIngredient } from 'frontapp/libs/api/Responses'
import BasicInput from 'frontapp/rcl/Atoms/BasicInput'
import Form from 'frontapp/rcl/Form'
import DropdownSearch from 'frontapp/rcl/Search/DropdownSearch'
import * as React from 'react'

import UsedIngredientInput from 'frontapp/rcl/Molecules/UsedIngredientInput'

interface SearchResult {
  id: string
  value: string
}

interface UsedIngredientNames {
  [id: string]: string
}

const transformIngredientsToSearchResults = (ingredients: Ingredient[]): SearchResult[] => {
  return ingredients.map((ingredient) => ({
    id: ingredient._id,
    value: ingredient.name,
  }))
}

interface Props {
  recipeId: string
}

interface State {
  recipeAtts: Recipe
  usedIngredientNames: UsedIngredientNames
  searchResults: SearchResult[]
}

class EditRecipe extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      usedIngredientNames: {},
      recipeAtts: {
        _id: '',
        name: '',
        usedIngredients: [],
      },
      searchResults: [],
    }
  }

  findUsedIngredientName = (id: string) => {
    const result = this.state.searchResults.find((searchResult) => searchResult.id === id)
    return result
  }

  async componentDidMount() {
    const recipesResponse = await api.get<RecipeResponse>(`/api/recipes/${this.props.recipeId}`)

    this.setState({ recipeAtts: mergeIntersect(this.state.recipeAtts, recipesResponse.data.recipe) })
  }

  handleSubmit = async () => {
    const { _id, ...atts } = this.state.recipeAtts
    const response = await api.put<Recipe>(`/api/recipes/${_id}`, atts)

    if (response.code >= 400) {
      console.log("There was an error setting your information")
    }
  }

  handleSelectSearchItem = (id: string) => {
    const name = this.findUsedIngredientName(id)
    const usedIngredient = { ingredient: id, quantity: 0, measurement: '' }
    this.setState({
      recipeAtts: {
        ...this.state.recipeAtts,
        usedIngredients: [...this.state.recipeAtts.usedIngredients, usedIngredient],
      },
      usedIngredientNames: { ...this.state.usedIngredientNames, [name.id]: name.value },
    })
  }

  handleRemoveIngredient = (id: string) => {
    const { usedIngredients } = this.state.recipeAtts
    this.setState({
      recipeAtts: {
        ...this.state.recipeAtts,
        usedIngredients: usedIngredients.filter((usedIngredient) => id !== usedIngredient.ingredient),
      },
    })
  }

  searchRecipe = async (searchText: string) => {
    const response = await api.get<IngredientsResponse>('/api/ingredients/',
      { search: searchText },
    )
    const searchResults = transformIngredientsToSearchResults(response.data.ingredients)
    this.setState({ searchResults })
    return searchResults
  }

  updateObject = ({ name, value }: { name: string, value: string }) => {
    this.setState({
      recipeAtts: { ...this.state.recipeAtts, [name]: value },
    })
  }

  updateUsedIngredient = (ingredient: UsedIngredient) => {
    const { usedIngredients } = this.state.recipeAtts

    const index = usedIngredients.findIndex(
      (usedIngredient) => usedIngredient.ingredient === ingredient.ingredient
    )
    const newUsedIngredients = [
      ...usedIngredients.slice(0, index),
      ingredient,
      ...usedIngredients.slice(index + 1, usedIngredients.length),
    ]

    this.setState({
      recipeAtts: { ...this.state.recipeAtts, usedIngredients: newUsedIngredients },
    })
    console.log({ recipeAtts: { ...this.state.recipeAtts, usedIngredients: newUsedIngredients } })
  }

  render() {
    const { recipeAtts, usedIngredientNames } = this.state
    return (
      <>
        <Form
          handleSubmit={this.handleSubmit}
        >
          <BasicInput
            labelText="Name: "
            id={recipeAtts.name}
            name="name"
            value={recipeAtts.name}
            onChange={this.updateObject}
          />
          <DropdownSearch
            onSearch={this.searchRecipe}
            onSelect={this.handleSelectSearchItem}
          />

          <div>
            {recipeAtts.usedIngredients.map((usedIngredient: UsedIngredient) =>
              <UsedIngredientInput
                name={usedIngredientNames[usedIngredient.ingredient]}
                ingredient={usedIngredient.ingredient}
                quantity={usedIngredient.quantity.toString()}
                measurement={usedIngredient.measurement}
                key={usedIngredient.ingredient}
                onRemove={this.handleRemoveIngredient}
                onChange={this.updateUsedIngredient}
              />
            )}
          </div>
        </Form >
      </>
    )
  }
}

export default EditRecipe
