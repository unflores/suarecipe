import * as React from 'react'

interface IProps {
  days: number
}

const Dropdown: React.StatelessComponent<IProps> = (props) => {
  const options = []

  for (let index: number = 1; index <= 10; index++) {
    options.push(<option key={index} value="{index}">{index}</option>)
  }

  return (<select>{options}</select>)
}

class DayChooser extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <h1>Give me <Dropdown days={3}/> days in Paris</h1>
        <button>Go!</button>
      </div>
    )
  }
}

export default DayChooser
