import Main from 'frontapp/templates/Main'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/index'

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)

import ItineraryBuilder from './ItineraryBuilder'

const App = () => (
  <Provider store={store}>
    <div>
      <Main>
        <ItineraryBuilder />
      </Main>
    </div>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))
