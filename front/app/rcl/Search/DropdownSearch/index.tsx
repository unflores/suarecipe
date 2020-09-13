import * as React from 'react'
import Search from '../index'
import * as styles from '../styles.css'

interface Props {
  onSearch: (search: string) => void
  onSelect: (id: string) => void
  results: Result[]
}

export interface Result {
  value: string
  id: string
}

class DropdownSearch extends React.Component<Props, {}> {


  handleSearch = (search: string) => {
    this.props.onSearch(search)
  }

  handleSelect = (id: string) => {
    this.props.onSelect(id)
  }

  render() {
    return (
      <>
        <Search
          onSearch={this.handleSearch}
        />
        <div className={styles.container}>
          <div className={styles.results}>
            {this.props.results.map((result) =>
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
      </>
    )
  }
}

export default DropdownSearch
