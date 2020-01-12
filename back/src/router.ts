import itinerariesController from './controllers/itineraries'
import locationsController from './controllers/locations'

export default (app) => {
  app.use('/api/itineraries', itinerariesController)
  app.use('/api/locations', locationsController)
}
