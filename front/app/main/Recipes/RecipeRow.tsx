import { Recipe } from 'frontapp/libs/api/Responses'
import * as React from 'react'

interface Props {
  recipe: Recipe
}

class RecipeRow extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { recipe } = this.props

    return (
      <tr>
        <td>{recipe.name}</td>
        <td>&nbsp;</td>
      </tr>
    )
  }
}

export default RecipeRow
