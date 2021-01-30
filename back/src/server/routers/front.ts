import { ingredientsController } from '../../controllers/ingredients'
import { recipesController } from '../../controllers/recipes'

import { Router } from 'express'
import { findIngredient, findRecipe } from '../params'

const router = Router()

router
  .param('recipe_id', findRecipe)
  .param('ingredient_id', findIngredient)

router
  .route('/ingredients')
  .get(ingredientsController.list)

router
  .route('/recipes/')
  .get(recipesController.list)

router
  .route('/recipes/:recipe_id')
  .get(recipesController.show)

router
  .route('/recipes/:recipe_id')
  .patch(recipesController.update)

export { router }
