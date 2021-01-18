import BasicInput from 'frontapp/rcl/Atoms/BasicInput'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

const ESCAPE_KEY = 27

interface State {
  search: string
}

interface Props {
  onSearch: (search: string) => void
  SearchResults?: React.FunctionComponent
  clickClearsSearch: boolean
}

class Search extends React.Component<Props, State> {

  static defaultProps = {
    clickClearsSearch: false
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      search: ''

    }
  }

  handleSearch = async (namevalue: { name: string, value: string }) => {

    this.setState({
      search: namevalue.value,
    })

    const searchResults = await this.props.onSearch(namevalue.value)
  }

  clearResults = async () => {
    this.setState({ search: '' })
    await this.props.onSearch('')
  }

  componentDidMount(): void {
    if (this.props.clickClearsSearch) {
      window.addEventListener('mousedown', this.handleClickOutside)
    }

    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleKeyDown)
    if (this.props.clickClearsSearch) {
      window.removeEventListener('mousedown', this.handleClickOutside)
    }
  }

  handleKeyDown = (event: KeyboardEvent): any => {
    switch (event.keyCode) {
      case ESCAPE_KEY:
        this.clearResults()
        break
      default:
        break
    }
  }

  handleClickOutside = (event: MouseEvent) => {
    const domNode = ReactDOM.findDOMNode(this)
    if (!(event.target instanceof HTMLElement)) {
      return
    }

    if (!domNode || !domNode.contains(event.target)) {
      this.clearResults()
    }
  }

  render() {
    return (
      <div>
        <BasicInput
          id={'temp thing'}
          labelText=""
          value={this.state.search}
          name="temp"
          onChange={this.handleSearch}
        />
        {this.props.SearchResults}
      </div>
    )
  }
}
export default Search
