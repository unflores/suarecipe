import * as React from 'react'

interface Props {
  id: string
  value: string
  name: string
  type: "text" | "number"
  labelText: string
  onChange: (event: React.FormEvent<HTMLInputElement>) => void
}

class BasicInput extends React.Component<Props, {}> {

  static defaultProps = {
    type: 'text'
  }

  constructor(props: Props) {
    super(props)
  }

  render() {
    const { id, value, name, onChange, labelText, type } = this.props

    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <input
          id={id}
          type={type}
          value={value}
          className="form-control"
          name={name}
          onChange={onChange}
        />
      </div>
    )
  }
}


export default BasicInput
