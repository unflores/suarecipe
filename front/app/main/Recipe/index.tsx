import api, { mergeIntersect } from 'frontapp/api'
import { FullRecipe, RecipeResponse } from 'frontapp/libs/api/Responses'
import { log } from 'frontapp/libs/logger'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// const recipe: FullRecipe = {
//   _id: '',
//   name: 'Recipe name',
//   usedIngredients: [{
//     ingredient: { name: 'Parsley', _id: 'lkjlkj' },
//     quantity: 3,
//     measurement: 'handfuls'
//   }],
//   steps: [{ _id: 'lkjk', body: 'step body' }]

// }

export interface Props {
  recipeId: string
}

const Recipe = (props: Props) => {
  const [recipe, setRecipe] = useState<FullRecipe>(undefined)

  useEffect(() => {
    async function loadRecipe() {
      const recipeResponse = await api.get<RecipeResponse>(`/api/book/recipes/${props.recipeId}`)
      if (recipeResponse.code === 400) {
        log('error', 'blah blah something')
      }

      setRecipe(recipeResponse.data.recipe)
    }
    loadRecipe()
    // this.setState({ recipeAtts: mergeIntersect(this.state.recipeAtts, recipesResponse.data.recipe) })
  }, [])

  if (!recipe) {
    return (<div />)
  }

  return (
    <div>
      <div><Link to="/book/recipes">Back to Recipes</Link></div>
      <h1>{recipe.name}</h1>
      <h2>Ingredients</h2>
      <ul>
        {recipe.usedIngredients.map((used) =>
          <li key={used.ingredient._id}>
            {used.quantity} {used.measurement} - {used.ingredient.name}
          </li>
        )}
      </ul>
      <h2>Steps</h2>
      <ul>
        {recipe.steps.map((step) =>
          <li key={step._id}>{step.body}</li>
        )}
      </ul>
    </div>
  )
}

export default Recipe
