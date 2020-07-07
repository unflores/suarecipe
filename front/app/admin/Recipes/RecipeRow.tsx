import * as React from 'react'
import { Recipe } from 'frontapp/libs/api/Responses'
// import Modal from 'frontapp/rcl/Modal'

interface Props {
  recipe: Recipe
}

interface State {
  isModalVisible: boolean
}

class RecipeRow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isModalVisible: false
    }
  }

  handleOpenModal = () => {
    this.setState({ isModalVisible: true })
  }

  handleCloseModal = () => {
    this.setState({ isModalVisible: false })
  }

  render() {
    const { recipe } = this.props

    return (
      <tr>
        <td>{recipe.name}</td>
        <td>
          {/* {this.state.isModalVisible &&
            <Modal
              title="Modify Ingredient"
              onClose={this.handleCloseModal}
            >
              <IngredientForm onSuccess={this.handleCloseModal} recipe={recipe} />
            </Modal>
          } */}
          <button onClick={this.handleOpenModal}>Modify</button>
        </td>
      </tr>
    )
  }
}

export default RecipeRow;
