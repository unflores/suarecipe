import * as React from 'react'
import { FullRecipe } from 'frontapp/libs/api/Responses'

const recipe: FullRecipe = {
  _id: 'alkjlkj',
  name: 'Recipe name',
  usedIngredients: [{
    ingredient: { name: 'Parsley', _id: 'lkjlkj' },
    quantity: 3,
    measurement: 'handfuls'
  }],
  steps: [{ _id: 'lkjk', body: 'step body' }]

}

export interface Props {
  recipeId: string
}

const Recipe = (props: Props) => (
  <div>
    <h1>{recipe.name}</h1>
    <h2>Ingredients</h2>
    <ul>
      {recipe.usedIngredients.map((used) =>
        <li>{used.ingredient.name}</li>
      )}
    </ul>
    <h2>Steps</h2>
    <ul>
      {recipe.steps.map((step) =>
        <li>{step.body}</li>
      )}
    </ul>
  </div>
)

export default Recipe
