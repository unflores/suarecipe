import location from '../models/location'
import { ILocation } from '../models/location'

interface IItinerary {
  morning: ILocation
  evening: ILocation
}

type DocumentChooser = (limit: number, choices: number) => number[]

export function randomChooser(limit: number, choices: number): number[] {
  const chosen: number[] = []

  for (let i: number = 0; i < choices; i++) {
    let choice

    do {
      choice = Math.floor((Math.random() * limit) + 1)
    } while (chosen.includes(choice))

    chosen[i] = choice
  }

  return chosen
}

export function buildItinerary(days: number, chooser: DocumentChooser = randomChooser): Promise<IItinerary[]> {
  const itinerary = []
  for (let index: number = 0; index < days ; index++) {
    itinerary[index] = {}
  }

  const mornings = Location.find({})
    .where('partsOfDay')
    .equals('morning')
    .exec()

  const evenings = Location.find({})
    .where('partsOfDay')
    .in(['afternoon', 'night'])
    .exec()

  for (const query of [mornings, evenings]) {
    query.catch((error) => {
      console.log(error)
      return []
    })
  }

  // TODO
  // Get randomized data within mongo instead of calculating it
  // in node
  return Promise.all([mornings, evenings]).then(([mornings, evenings]) => {
    if (mornings.length < days) {
      console.log('Not enough morning locations available')
      return []
    }
    if (evenings.length < days) {
      console.log('Not enough evening locations available')
      return []
    }

    const morningsIndexes = chooser(mornings.length, days)
    const eveningsIndexes = chooser(mornings.length, days)

    for (let index = 0; index < morningsIndexes.length; index++) {
      itinerary[index].morning = mornings[morningsIndexes[index]]
    }

    for (const index in eveningsIndexes) {
      itinerary[index].evening = evenings[eveningsIndexes[index]]
    }

    return itinerary
  })

}
