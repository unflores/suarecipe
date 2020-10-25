import * as React from 'react'

interface Props {
  id?: string
  value: string
  name: string
  type: "text" | "number"
  labelText?: string
  onChange: (namevalue: NameValue) => void
}

interface NameValue {
  name: string
  value: string
}

class BasicInput extends React.Component<Props, {}> {

  static defaultProps = {
    type: 'text',
  }

  constructor(props: Props) {
    super(props)
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget
    this.props.onChange({ name, value })
  }

  render() {
    const { id, value, name, onChange, labelText, type } = this.props

    return (
      <div className="form-group">
        {labelText ? <label htmlFor={id}>{labelText}</label> : null}

        <input
          id={id}
          type={type}
          value={value}
          className="form-control"
          name={name}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default BasicInput
