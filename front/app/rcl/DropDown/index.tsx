import * as React from 'react'

interface Option {
  label: string
  value: string
}

interface Props {
  options: Option[]
  onChange: (value: string) => void
}

interface State {
  value: string
}

class Dropdown extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = { value: '' }
  }

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <div className="form-group">
        <select
          value={this.state.value}
          className="form-control"
          onChange={this.handleChange}
        >
          {this.props.options.map((option: Option) =>
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )}
        </select>
      </div>
    )
  }
}


export default Dropdown
