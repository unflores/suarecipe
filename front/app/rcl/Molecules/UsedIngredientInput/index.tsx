import * as React from 'react'
import Dropdown from 'frontapp/rcl/Atoms/DropDown'
import BasicInput from 'frontapp/rcl/Atoms/BasicInput'

export interface AddedUsedIngredient {
  _id: string
  name: string
  measurement: string
  quantity: string
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
  _id: string
  onRemove: (id: string) => void
  onChange: (ingredient: AddedUsedIngredient) => void
}

interface State {
  _id: string
  measurement: string
  quantity: string
}

class UsedIngredientInput extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      _id: props._id,
      measurement: '',
      quantity: ''
    }
  }

  handleChange = (namevalue: { name: string, value: string }) => {
    this.setState({ ...this.state, [namevalue.name]: namevalue.value })
    this.props.onChange({ ...this.state, name: this.props.name })
  }

  handleRemove = () => {
    this.props.onRemove(this.state._id)
  }

  render() {
    return (
      <div className="row" >
        <div className="col-3">{this.props.name}</div>
        <div className="col-3">
          <Dropdown
            name="measurements"
            options={MEASUREMENTS}
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
