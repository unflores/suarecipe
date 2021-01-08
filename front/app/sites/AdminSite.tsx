import AdminLayout from 'frontapp/templates/Admin'
import * as React from 'react'
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import Ingredients from '../admin/Ingredients'
import RecipeForm from '../admin/RecipeForm'
import Recipes from '../admin/Recipes'
import ErrorBoundary from '../ErrorBoundary'

interface RecipeFormProps extends RouteComponentProps<{ recipeId: string }> { }

const Admin = () => (
  <AdminLayout>
    <Switch>
      <Route path="/ingredients">
        <ErrorBoundary key="/admin/ingredients">
          <Ingredients />
        </ErrorBoundary>
      </Route>
      <Route exact path="/admin/recipes">
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
  </AdminLayout>
)

export default Admin
