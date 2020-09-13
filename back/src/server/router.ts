import { ingredientsController } from '../controllers/ingredients'
import { recipesController } from '../controllers/recipes/'
import { stepsController } from '../controllers/recipes/steps'

import { findRecipe, findIngredient } from './params'
import { Router } from 'express'

const router = Router()

router
  .param('recipe_id', findRecipe)
  .param('ingredient_id', findIngredient)

router
  .route('/api/ingredients')
  .get(ingredientsController.list)

router
  .route('/api/ingredients/:ingredient_id')
  .patch(ingredientsController.update)


router
  .route('/api/recipes/')
  .post(recipesController.create)
  .get(recipesController.list)

router
  .route('/api/recipes/:recipe_id')
  .get(recipesController.show)

router
  .route('/api/recipes/:recipe_id')
  .patch(recipesController.update)

router
  .route('/api/recipes/:recipe_id/steps')
  .post(stepsController.create)
  .patch(stepsController.updateAll)

router.route('/api/recipes/:recipe_id/steps/:step_id')
  .delete(stepsController.destroy)

export { router }
