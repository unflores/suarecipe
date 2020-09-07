import Main from 'frontapp/templates/Main'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from "react-router-dom"
import reducer from './reducers/index'

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)

import Ingredients from './admin/Ingredients'
import Recipes from './admin/Recipes'
import EditRecipe from './admin/EditRecipe'

interface EditRecipeProps extends RouteComponentProps<{ recipeId: string }> { }

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Main>
          <Switch>
            <Route path="/admin/ingredients">
              <Ingredients />
            </Route>
            <Route exact={true} path="/admin/recipes">
              <Recipes />
            </Route>
            <Route
              path="/admin/recipes/:recipeId/edit"
              render={(props: EditRecipeProps) => <EditRecipe recipeId={props.match.params.recipeId} />}
            />
            <Route>
              <Ingredients />
            </Route>
          </Switch>
        </Main>
      </div>
    </Router>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))
