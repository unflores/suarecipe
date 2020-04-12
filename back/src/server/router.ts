import ingredientsController from '../controllers/ingredients'

export default (app) => {
  app.use('/api/ingredients', ingredientsController)
}
