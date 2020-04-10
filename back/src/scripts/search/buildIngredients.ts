import Ingredient from '../../models/ingredient'
import search from '../../initializers/search'

async function buildIndex() {
  const ingredientsIndex = await search.initIndex('ingredients')
  const ingredients = await Ingredient.find({}, 'id partsOfDay zipcode')
  try {
    ingredientsIndex.addObjects(ingredients)
  } catch (error) {
    console.error(error)
  }
}

buildIndex()
