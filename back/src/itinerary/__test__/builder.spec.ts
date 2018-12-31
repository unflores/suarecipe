import Location from '../../models/location'
import * as Builder from '../builder'
import {ILocation, ILocationModel} from '../../models/location'
import * as Promise from 'bluebird'

process.env.TEST_SUITE = 'builder-spec'

describe('Builder', () => {
  beforeEach((done) => {
    const locations: Promise<ILocationModel>[] = []

    Array.from(Array(3)).forEach((val, index) => {
      let morningParams: ILocation = {
        name: `namemorning${index}`,
        type: 'type',
        partsOfDay: ['morning'],
        description: 'description',
        siteLink: 'http://derp.com',
        address: 'address',
        zipcode: 75010,
      }
      let eveningParams: ILocation = {
        name: `nameevening${index}`,
        type: 'type',
        partsOfDay: ['afternoon'],
        description: 'description',
        siteLink: 'http://derp.com',
        address: 'address',
        zipcode: 75010,
      }
      let morningLocation = new Location(morningParams)
      let eveningLocation = new Location(eveningParams)

      locations.push(morningLocation.save())
      locations.push(eveningLocation.save())
    })
    Promise.all(locations).then(() => { done()})

  })

  test('should return an itinerary of 3 days', (done) => {
    Builder.buildItinerary(3).then((itinerary) => {
      expect(itinerary.length).toEqual(3)
      done()
    })
  })

  test('should split mornings and evenings', (done) => {
    Builder.buildItinerary(3).then((itinerary) => {
      expect(itinerary[0].morning.partsOfDay).toContain('morning')
      done()
    })
  })
})
