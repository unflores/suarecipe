import Main from 'frontapp/templates/Main'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from "react-router-dom"
import { createStore } from 'redux'
import reducer from './reducers/index'

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

import RecipeForm from './admin/EditRecipe'
import Ingredients from './admin/Ingredients'
import Recipes from './admin/Recipes'
import ErrorBoundary from './ErrorBoundary'

interface RecipeFormProps extends RouteComponentProps<{ recipeId: string }> { }

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Main>
          <Switch>
            <Route path="/admin/ingredients">
              <ErrorBoundary key="/admin/ingredients">
                <Ingredients />
              </ErrorBoundary>
            </Route>
            <Route exact={true} path="/admin/recipes">
              <ErrorBoundary key="/admin/recipes">
                <Recipes />
              </ErrorBoundary>

            </Route>
            <Route
              path="/admin/recipes/:recipeId/edit"
              render={(props: RecipeFormProps) =>
                <ErrorBoundary key={props.match.url}>
                  <RecipeForm recipeId={props.match.params.recipeId} />
                </ErrorBoundary>
              }
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
