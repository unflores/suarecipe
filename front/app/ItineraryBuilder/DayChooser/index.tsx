import * as React from 'react'

interface IDropdownProps {
  days: number
  chooseDays(event: any): void
}

interface IDayChooserProps {
  handleChosenDays(chosen: number): void
}

const Dropdown: React.StatelessComponent<IDropdownProps> = ({ days, chooseDays }) => {
  const options = []

  for (let index: number = 1; index <= 10; index++) {
    options.push(
      <option key={index} value={index}>
        {index}
      </option>)
  }

  return (
    <select
      defaultValue={days.toString()}
      onChange={chooseDays}
    >
      {options}
    </select>
  )
}

class DayChooser extends React.Component<IDayChooserProps, {}> {

  public render() {
    return (
      <div>
        <h1>Give me <Dropdown chooseDays={this.chooseDays} days={3}/> days in Paris</h1>
      </div>
    )
  }

  private chooseDays = (event: any) => {
      this.props.handleChosenDays(event.target.value)
  }
}

export default DayChooser
