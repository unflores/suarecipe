import logger from '../../config/logger'
import Ingredient, { IIngredient } from '../models/ingredient'

interface IItinerary {
  morning: IIngredient
  evening: IIngredient
}

type DocumentChooser = (limit: number, choices: number) => number[]

/*
 *  Chooses a number lower than a highest number
 *
 *  highest Number maximum number to choose
 *  choices Number amount of times to choose
 * */
export function randomChooser(highest: number, choices: number): number[] {
  const chosen: number[] = []

  for (let i: number = 0; i < choices; i += 1) {
    let choice

    do {
      choice = Math.floor(Math.random() * highest)
    } while (chosen.includes(choice))

    chosen[i] = choice
  }

  return chosen
}

export function buildItinerary(
  days: number,
  chooser: DocumentChooser = randomChooser,
): Promise<IItinerary[]> {
  const itinerary = []
  for (let index: number = 0; index < days; index += 1) {
    itinerary[index] = {}
  }

  const queryCatch = (error) => {
    logger.error(error)
    return []
  }

  const dayPlans = [
    Ingredient.find({})
      .where('partsOfDay')
      .equals('morning')
      .exec()
      .catch(queryCatch),
    Ingredient.find({})
      .where('partsOfDay')
      .in(['afternoon', 'night'])
      .exec()
      .catch(queryCatch),
  ]

  // TODO
  // Get randomized data within mongo instead of calculating it
  // in node
  return Promise.all(dayPlans).then(([mornings, evenings]) => {
    if (mornings.length < days) {
      logger.error('Not enough morning ingredients available')
      return []
    }
    if (evenings.length < days) {
      logger.error('Not enough evening ingredients available')
      return []
    }

    const morningsIndexes = chooser(mornings.length, days)
    const eveningsIndexes = chooser(evenings.length, days)

    for (let index = 0; index < morningsIndexes.length; index += 1) {
      itinerary[index].morning = mornings[morningsIndexes[index]]
    }

    for (let index = 0; index < eveningsIndexes.length; index += 1) {
      itinerary[index].evening = evenings[eveningsIndexes[index]]
    }

    return itinerary
  })
}
