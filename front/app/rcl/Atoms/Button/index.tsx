import * as React from 'react'

interface Props {
  text: string
  type: string
  onClick: () => void
}

class Button extends React.Component<Props, {}> {

  static defaultProps = {
    text: 'Submit',
    type: 'success'
  }

  constructor(props: Props) {
    super(props)
  }

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    this.props.onClick()
  }

  render() {
    const { text } = this.props

    return (
      <div className="form-group">
        <button
          onClick={this.handleClick}
          className={`btn btn-${this.props.type}`}
        >
          {text}
        </button>
      </div >
    )
  }
}

export default Button
