import * as APICaballero from 'apicaballero'

const routes: APICaballero.Routes = {
  itineraries: {
    create: '/itineraries/',
  },
  options: {
    base_path: '/api',
  },
}

const caballero = new APICaballero(routes)

export default caballero
