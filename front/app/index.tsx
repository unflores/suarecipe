import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { createStore } from 'redux'
import reducer from './reducers/index'

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

import AdminSite from './sites/AdminSite'
import BookSite from './sites/BookSite'

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/book">
          <BookSite />
        </Route>

        <Route path="/admin">
          <AdminSite />
        </Route>
      </div>
    </Router >
  </Provider >
)

ReactDOM.render(<App />, document.getElementById('app'))
