import * as React from 'react'
import * as ReactDOM from 'react-dom';
import BasicInput from 'frontapp/rcl/BasicInput'
import * as styles from './styles.css'

const ESCAPE_KEY = 27

interface State {
  search: string
  searchResults: SearchResults[]
}

interface Props {
  onSearch: (search: string) => Promise<SearchResults[]>
  onSelect: (id: string) => void
}

interface SearchResults {
  value: string
  id: string
}

class Search extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      search: '',
      searchResults: []
    }
  }

  handleSearch = async (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    this.setState({
      search: value
    })

    const searchResults = await this.props.onSearch(value)
    console.log({ searchResults, state: this.state })
    this.setState({ searchResults })
  }

  clearResults = () => {
    this.setState({ search: '', searchResults: [] })
  }

  handleSelect = (id: string) => {
    this.clearResults()
    this.props.onSelect(id)
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
        <div className={styles.container}>
          <div className={styles.results}>
            {this.state.searchResults.map((result) =>
              <div
                className={styles.result}
                key={result.id}
                onClick={() => this.handleSelect(result.id)}
              >
                {result.value}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default Search
