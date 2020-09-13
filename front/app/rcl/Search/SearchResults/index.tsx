import * as React from 'react'
import * as styles from '../styles.css'

export interface Result {
  value: string
  id: string
}

interface State {
}

interface Props {
  results: Result[]
  onSelect: (id: string) => void
}

class SearchResults extends React.Component<Props, State> {

  handleSelect = (id: string) => {
    this.props.onSelect(id)
  }

  render() {
    return (
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
    )
  }
}

export default SearchResults
