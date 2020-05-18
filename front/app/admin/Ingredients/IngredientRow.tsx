import * as React from 'react'
import { IngredientResponse } from 'frontapp/libs/api/Responses'
import Modal from 'frontapp/rcl/Modal'
import IngredientForm from 'frontapp/admin/Ingredients/IngredientForm'

interface Props {
  ingredient: IngredientResponse
}

interface State {
  isModalVisible: boolean
}

class IngredientRow extends React.Component<Props, State> {
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
    const { ingredient } = this.props

    return (
      <tr>
        <td>{ingredient.name}</td>
        <td>
          {this.state.isModalVisible &&
            <Modal
              title="Modify Ingredient"
              onClose={this.handleCloseModal}
            >
              <IngredientForm onSuccess={this.handleCloseModal} ingredient={ingredient} />
            </Modal>
          }
          <button onClick={this.handleOpenModal}>Modify</button>
        </td>
      </tr>
    )
  }
}

export default IngredientRow;
