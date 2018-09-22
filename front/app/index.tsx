import * as React from 'react'
import * as ReactDOM from 'react-dom'

import ItineraryBuilder from './ItineraryBuilder'

const App = () => (
  <div>
    <ItineraryBuilder stage='choose_day'/>
  </div>
)

ReactDOM.render(<App/>, document.getElementById('app'))
