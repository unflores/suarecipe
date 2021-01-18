import MainLayout from 'frontapp/templates/Main'
import * as React from 'react'
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import ErrorBoundary from '../ErrorBoundary'
import Recipe from '../main/Recipe'
import MainRecipes from '../main/Recipes'

interface RecipeProps extends RouteComponentProps<{ recipeId: string }> { }

const Book = () => (
  <MainLayout>
    <Switch>
      <Route exact={true} path="/book/recipes">
        <ErrorBoundary key="/recipes">
          <MainRecipes />
        </ErrorBoundary>
      </Route>
      <Route
        path="/book/recipes/:recipeId/"
        render={(props: RecipeProps) =>
          <ErrorBoundary key={props.match.url}>
            <Recipe recipeId={props.match.params.recipeId} />
          </ErrorBoundary>
        }
      />
      <ErrorBoundary key="/recipes">
        <MainRecipes />
      </ErrorBoundary>
    </Switch>
  </MainLayout>
)

export default Book
