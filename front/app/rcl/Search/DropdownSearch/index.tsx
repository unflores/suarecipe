import BasicInput from 'frontapp/rcl/Atoms/BasicInput'
import * as React from 'react'
import ReactDOM = require('react-dom')
import * as styles from '../styles.css'

interface Props {
  onSearch: (search: string) => Promise<Result[]>
  onSelect: (id: string) => void
}

export interface Result {
  value: string
  id: string
}

interface State {
  search: string
  results: Result[]
}

class DropdownSearch extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      search: '',
      results: [],
    }
  }

  componentDidMount(): void {
    window.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount(): void {
    window.removeEventListener('mousedown', this.handleClickOutside)
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

  clearResults = async () => {
    this.setState({ search: '', results: [] })
  }

  handleSearch = async (namevalue: { name: string, value: string }) => {
    this.setState({
      search: namevalue.value,
    })

    const results = await this.props.onSearch(namevalue.value)
    this.setState({ results })
    console.log({ results, state: this.state })
  }

  handleSelect = (id: string) => {
    this.props.onSelect(id)
    this.setState({ search: '', results: [] })
  }

  onClear = () => {
    this.setState({ search: '' })
  }

  render() {
    return (
      <>
        <BasicInput
          id={'TODO'}
          labelText=""
          value={this.state.search}
          name="temp"
          onChange={this.handleSearch}
        />
        <div className={styles.container}>
          <div className={styles.results}>
            {this.state.results.map((result) =>
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
