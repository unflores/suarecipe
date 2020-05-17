import * as React from 'react'
import * as styles from './styles.css'
import { Link } from "react-router-dom";

export default function SideNav() {

  return (
    <nav className={styles.sidebar}>
      <div className={styles.header}>
        <h2>Admin</h2>
      </div>

      <ul className={styles.components}>
        <li><Link to="/admin/ingredients">Ingredients</Link></li>
      </ul>
    </nav >
  )
}
