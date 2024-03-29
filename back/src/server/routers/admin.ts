import { ingredientsController } from '../../controllers/ingredients'
import { recipesController } from '../../controllers/recipes'
import { stepsController } from '../../controllers/recipes/steps'

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
  .route('/ingredients/:ingredient_id')
  .patch(ingredientsController.update)

router
  .route('/recipes/')
  .post(recipesController.create)
  .get(recipesController.list)

router
  .route('/recipes/:recipe_id')
  .get(recipesController.show)

router
  .route('/recipes/:recipe_id')
  .patch(recipesController.update)

router
  .route('/recipes/:recipe_id/steps')
  .post(stepsController.create)
  .patch(stepsController.updateAll)

router.route('/recipes/:recipe_id/steps/:step_id')
  .delete(stepsController.destroy)

export { router }
