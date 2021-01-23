import { Recipe } from 'frontapp/libs/api/Responses'
import * as React from 'react'
import { Link } from 'react-router-dom'

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
        <td><Link to={`/book/recipes/${recipe._id}`}>{recipe.name}</Link></td>
        <td>&nbsp;</td>
      </tr>
    )
  }
}

export default RecipeRow
