import { Routes } from 'apicaballero'
import APICaballero from 'apicaballero'

const routes: Routes = {
  itineraries: {
    create : '/itineraries/',
  },
  options: {
    base_path: '/api',
  },
}

const caballero= new APICaballero(routes)

export default caballero
