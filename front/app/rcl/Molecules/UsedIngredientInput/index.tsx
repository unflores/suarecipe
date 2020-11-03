import BasicInput from 'frontapp/rcl/Atoms/BasicInput'
import Dropdown from 'frontapp/rcl/Atoms/DropDown'
import * as React from 'react'

export interface AddedUsedIngredient {
  ingredient: string
  name: string
  measurement: string
  quantity: number
}

interface Option {
  value: string
  label: string
}

const MEASUREMENTS: Option[] = [
  { value: 'pounds', label: 'Pounds' },
  { value: 'ounces', label: 'Ounces' },
  { value: 'grams', label: 'Grams' },
  { value: 'kilograms', label: 'Kilograms' },
  { value: 'tablespoons', label: 'Tablespoons' },
  { value: 'teaspoons', label: 'Teaspoons' },
  { value: 'cups', label: 'Cups' },
  { value: 'pinches', label: 'pinches' },
  { value: 'mililiters', label: 'Mililiters' },
  { value: 'liters', label: 'Liters' },
  { value: 'gallons', label: 'Gallons' },
  { value: 'pieces', label: 'Pieces' },
]

interface Props {
  name: string
  ingredient: string
  measurement: string
  quantity: string
  onRemove: (id: string) => void
  onChange: (ingredient: AddedUsedIngredient) => void
}

interface State {
  ingredient: string
  measurement: string
  quantity: string
}

class UsedIngredientInput extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      ingredient: props.ingredient,
      measurement: props.measurement || MEASUREMENTS[0].value,
      quantity: props.quantity || '0',
    }
  }

  handleChange = (namevalue: { name: string, value: string }) => {
    const newState = { ...this.state, [namevalue.name]: namevalue.value }
    this.setState(newState)

    const ingredient = {
      name: this.props.name,
      ingredient: newState.ingredient,
      measurement: newState.measurement,
      quantity: /^\d+(\.\d+)?$/.test(newState.quantity) ? parseInt(newState.quantity, 10) : 0,
    }
    console.log({ newState, ingredient })
    this.props.onChange(ingredient)
  }

  handleRemove = () => {
    this.props.onRemove(this.state.ingredient)
  }

  render() {
    return (
      <div className="row" >
        <div className="col-3">{this.props.name}</div>
        <div className="col-3">
          <Dropdown
            name="measurement"
            options={MEASUREMENTS}
            selected={this.state.measurement}
            onChange={this.handleChange}
          />
        </div>
        <div className="col-2">
          <BasicInput
            name="quantity"
            type="number"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
        </div>
        <div className="col-2">
          <button onClick={this.handleRemove} >Remove</button>
        </div>
      </div>
    )

  }
}

export default UsedIngredientInput
