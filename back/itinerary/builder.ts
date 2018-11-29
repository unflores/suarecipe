import Location from '../models/location'
import {ILocation} from '../models/location'

interface IItinerary {
  morning: ILocation
  evening: ILocation
}

export function exec (days: number): Promise<IItinerary[]> {
  const itinerary = []
  for(let index: number = 0; index < days ; index++){
    itinerary[index] = {}
  }

  const mornings = Location.find({})
    .where('partsOfDay')
    .equals('morning')
    .limit(days)

  const evenings = Location.find({})
    .where('partsOfDay')
    .in(['afternoon', 'night'])
    .limit(days)

  // TODO
  // Get randomized data within mongo instead of calculating it
  // in node
  return Promise.all([mornings,evenings]).then(([mornings, evenings]) => {
    mornings.forEach((location, index) => itinerary[index]['morning'])
    evenings.forEach((location, index) => itinerary[index]['evening'])
    return itinerary
  })

}

