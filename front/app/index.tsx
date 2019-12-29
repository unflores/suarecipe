import Main from 'frontapp/templates/Main'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import reducer from './reducers/index'

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)

import ItineraryBuilder from './ItineraryBuilder'
import Locations from './admin/Locations'

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Main>
          <Switch>
            <Route path="/builder">
              <ItineraryBuilder />
            </Route>
            <Route path="/admin/locations">
              <Locations />
            </Route>
            <Route>
              <ItineraryBuilder />
            </Route>
          </Switch>
        </Main>
      </div>
    </Router>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))
