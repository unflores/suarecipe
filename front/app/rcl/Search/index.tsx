import * as React from 'react'
import * as ReactDOM from 'react-dom';
import BasicInput from 'frontapp/rcl/BasicInput'

const ESCAPE_KEY = 27

interface State {
  search: string
}

interface Props {
  onSearch: (search: string) => void
  SearchResults?: React.FunctionComponent
}

class Search extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  handleSearch = async (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    this.setState({
      search: value
    })

    const searchResults = await this.props.onSearch(value)
    console.log({ searchResults, state: this.state })
  }

  clearResults = async () => {
    this.setState({ search: '' })
    await this.props.onSearch('')
  }

  componentDidMount(): void {
    window.addEventListener('mousedown', this.handleClickOutside);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleKeyDown = (event: KeyboardEvent): any => {
    switch (event.keyCode) {
      case ESCAPE_KEY:
        this.clearResults()
        break;
      default:
        break;
    }
  }

  handleClickOutside = (event: MouseEvent) => {
    const domNode = ReactDOM.findDOMNode(this);
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
