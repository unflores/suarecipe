import * as React from 'react'
import * as styles from './styles.css'

interface Props {
  children: any
}

const Main: React.SFC<Props> = ({ children }) => (
  <div>
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">SuaRecipe</a>
      </nav>
    </header>
    <div className={styles.wrapper}>
      <div className="container">{children}</div>
    </div>
  </div>
)

export default Main
