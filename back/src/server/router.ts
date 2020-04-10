import itinerariesController from '../controllers/itineraries'
import ingredientsController from '../controllers/ingredients'

export default (app) => {
  app.use('/api/itineraries', itinerariesController)
  app.use('/api/ingredients', ingredientsController)
}
