import * as React from 'react'
import BasicInput from 'frontapp/rcl/BasicInput'
import * as styles from './styles.css'

interface State {
  search: string
  searchResults: SearchResults[]
}

interface Props {
  onSearch: (search: String) => SearchResults[]
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

  updateSearch = async (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    this.setState({
      search: value
    })

    const searchResults = await this.props.onSearch(value)
    console.log({ searchResults, state: this.state })
    this.setState({ searchResults })
  }

  render() {
    return (
      <>
        <BasicInput
          id={'temp thing'}
          labelText=""
          value={this.state.search}
          name="temp"
          onChange={this.updateSearch}
        />
        <div className={styles.container}>
          <div className={styles.results}>
            {this.state.searchResults.map((result) =>
              <div key={result.id}>{result.value}</div>
            )}
          </div>
        </div>
      </>
    )
  }
}
export default Search
