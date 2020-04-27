import ingredientsController from '../controllers/ingredients'
import recipesController from '../controllers/recipes'
import StepsController from '../controllers/recipes/steps'
import { Express } from 'express'

export default (app: Express) => {
  app.use('/api/ingredients', ingredientsController)
  app.use('/api/recipes', recipesController)
  app.use('/api/recipes', StepsController)
}
