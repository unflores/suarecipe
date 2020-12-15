import MainLayout from 'frontapp/templates/Main'
import * as React from 'react'
import { Route, Switch } from "react-router-dom"
import ErrorBoundary from '../ErrorBoundary'
import MainRecipes from '../main/Recipes'

const Book = () => (
  <MainLayout>
    <Switch>
      <Route path="/book/recipes">
        <ErrorBoundary key="/recipes">
          <MainRecipes />
        </ErrorBoundary>
      </Route>
      <ErrorBoundary key="/recipes">
        <MainRecipes />
      </ErrorBoundary>
    </Switch>
  </MainLayout>
)

export default Book
