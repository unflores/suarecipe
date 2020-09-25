import * as React from 'react'
import Button from 'frontapp/rcl/Atoms/Button'

const ENTER_KEY = 13

interface Props {
  handleSubmit: () => void
  children: any
}

class Form extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props)
  }

  componentDidMount(): void {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent): any => {
    switch (event.keyCode) {
      case ENTER_KEY:
        this.handleSubmit()
        event.preventDefault()
        break;
      default:
        break;
    }
  }

  handleSubmit = async () => {
    await this.props.handleSubmit()
  }

  render() {
    return (
      <form>
        {this.props.children}
        <Button onClick={this.handleSubmit} />
      </form>
    )
  }
}

export default Form
