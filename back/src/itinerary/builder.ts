import logger from '../../config/logger'
import Location, { ILocation } from '../models/location'

interface IItinerary {
  morning: ILocation
  evening: ILocation
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
    Location.find({})
      .where('partsOfDay')
      .equals('morning')
      .exec()
      .catch(queryCatch),
    Location.find({})
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
      logger.error('Not enough morning locations available')
      return []
    }
    if (evenings.length < days) {
      logger.error('Not enough evening locations available')
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
