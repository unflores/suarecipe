import * as React from 'react'
import { Recipe } from 'frontapp/libs/api/Responses'
import { Link } from "react-router-dom";


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
        <td>
          <Link to={`/admin/recipes/${recipe._id}/edit`}>Modify</Link>
        </td>
      </tr>
    )
  }
}

export default RecipeRow;
