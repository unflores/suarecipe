import * as React from 'react'

interface Props {
  text: string
  onClick: () => void
}

class Button extends React.Component<Props, {}> {

  static defaultProps = {
    text: 'Submit',
  }

  constructor(props: Props) {
    super(props)
  }

  render() {
    const { text, onClick } = this.props

    return (
      <div className="form-group">
        <button
          onClick={onClick}
          type="button"
          className="btn btn-success"
        >
          {text}
        </button>
      </div>
    )
  }
}

export default Button
