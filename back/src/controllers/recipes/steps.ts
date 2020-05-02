import { Request, Response, Router } from 'express'
import Recipe, { IRecipe } from '../../models/recipe'

class ParamsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ParamsError'
  }
}

const stepsController = Router()

type RecipeRequest = Request & { recipe: IRecipe }

stepsController.param('recipe_id', async function (req: RecipeRequest, res: Response, next, recipe_id: string) {
  const recipe = await Recipe.findOne({ _id: recipe_id })
  if (recipe) {
    req.recipe = recipe
    next()
  } else {
    next(new ParamsError('Failed to load recipe from params'))
  }

})

stepsController.post('/:recipe_id/steps', async function (req: RecipeRequest, res: Response) {
  const formValues = req.body
  const recipe = req.recipe

  recipe.steps.push({ body: <string>formValues.step.body })
  await recipe.save()
  res.send({ step: recipe.steps[recipe.steps.length - 1] })
})

stepsController.patch('/:recipe_id/steps', async function (req: RecipeRequest, res: Response) {
  const formValues = req.body
  const steps = formValues.steps
  const recipe = req.recipe

  recipe.steps = steps
  await recipe.save()
  res.send({ steps: recipe.steps })
})

stepsController.delete('/:recipe_id/steps/:step_id', async function (req: RecipeRequest, res: Response) {
  const recipe = req.recipe
  await recipe.steps.id(req.params['step_id']).remove()

  res.send({ steps: recipe.steps })
})

export { stepsController }
