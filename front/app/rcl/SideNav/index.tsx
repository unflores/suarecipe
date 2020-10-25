import * as React from 'react'
import { Link } from "react-router-dom"
import * as styles from './styles.css'

export default function SideNav() {

  return (
    <nav className={styles.sidebar}>
      <div className={styles.header}>
        <h2>Admin</h2>
      </div>

      <ul className={styles.components}>
        <li><Link to="/admin/recipes">Recipes</Link></li>
        <li><Link to="/admin/ingredients">Ingredients</Link></li>
      </ul>
    </nav >
  )
}
