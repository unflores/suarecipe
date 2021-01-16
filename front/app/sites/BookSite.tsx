import MainLayout from 'frontapp/templates/Main'
import * as React from 'react'
import { Route, Switch, RouteComponentProps } from "react-router-dom"
import ErrorBoundary from '../ErrorBoundary'
import MainRecipes from '../main/Recipes'
import Recipe from '../main/Recipe'

interface RecipeProps extends RouteComponentProps<{ recipeId: string }> { }

const Book = () => (
  <MainLayout>
    <Switch>
      <Route exact path="/book/recipes">
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
