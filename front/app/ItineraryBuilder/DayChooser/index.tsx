import * as React from 'react'

interface Props {
  days: number
}

const Dropdown: React.StatelessComponent<Props> = (props) => {
  let options = []
  for (let index:number= 1; index <= 10; index++) {
    options.push(<option key={index} value="{index}">{index}</option>)
  }

  return (<select>{options}</select>)
}

class DayChooser extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>Give me <Dropdown days={3}/> days in Paris</h1>
        <button>Go!</button>
      </div>
    )
  }
}

export default DayChooser
