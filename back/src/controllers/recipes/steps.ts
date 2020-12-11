import { Request, Response } from 'express'

const create = async (req: Request, res: Response) => {
  const formValues = req.body
  const recipe = req.paramObjects.recipe

  recipe.steps.push({ body: formValues.step.body as string })
  await recipe.save()
  res.send({ steps: recipe.steps })
}

const updateAll = async (req: Request, res: Response) => {
  const formValues = req.body
  const steps = formValues.steps
  const recipe = req.paramObjects.recipe

  recipe.steps = steps
  await recipe.save()
  res.send({ steps: recipe.steps })
}

const destroy = async (req: Request, res: Response) => {
  const recipe = req.paramObjects.recipe
  await recipe.steps.id(req.params.step_id).remove()

  res.send({ steps: recipe.steps })
}

export const stepsController = {
  create,
  updateAll,
  destroy,
}
