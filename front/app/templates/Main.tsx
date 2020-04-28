import * as React from 'react'

interface IProps {
  children: any
}

const Main: React.SFC<IProps> = ({ children }) => (
  <div>
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">SuaRecipe</a>
      </nav>
    </header>

    <div className="container">{children}</div>
  </div>
)

export default Main
