import * as React from 'react'

interface Option {
  label: string
  value: string
}

interface Props {
  options: Option[]
  name: string
  onChange: (namevalue: { name: string, value: string }) => void
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
    const { value, name } = event.currentTarget
    this.setState({ value })
    this.props.onChange({ name, value })
  }

  render() {
    return (
      <div className="form-group">
        <select
          name={this.props.name}
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
            </option>,
          )}
        </select>
      </div>
    )
  }
}

export default Dropdown
