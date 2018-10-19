import * as React from 'react'
import * as styles from './styles.css'

interface IDropdownProps {
  chooseDays(event: any): void
}

interface IDayChooserProps {
  handleChosenDays(chosen: number): void
}

const Dropdown: React.StatelessComponent<IDropdownProps> = ({ chooseDays }) => {
  const options = [<option key='default' disabled={true} value='' />]

  for (let index: number = 1; index <= 10; index++) {
    options.push(
      <option key={index} value={index}>
        {index}
      </option>)
  }

  return (
    <select
      value={''}
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
        <h1 className={styles.parisDays}>Give me <Dropdown chooseDays={this.chooseDays}/> days in Paris</h1>
      </div>
    )
  }

  private chooseDays = (event: any) => {
      this.props.handleChosenDays(event.target.value)
  }
}

export default DayChooser
