import Location from '../../models/location'
import search from '../../initializers/search'

async function buildIndex() {
  const locationsIndex = await search.initIndex('locations')
  const locations = await Location.find({}, 'id partsOfDay zipcode')
  try {
    locationsIndex.addObjects(locations)
  } catch (error) {
    console.error(error)
  }
}

buildIndex()
