import { expect } from 'chai'
import * as Promise from 'bluebird'
import Location, { ILocation, ILocationModel } from '../../models/location'
import * as Builder from '../builder'


describe('Builder', () => {
  beforeEach((done) => {
    const locations: Array<Promise<ILocationModel>> = []

    Array.from(Array(3)).forEach((val, index) => {
      const eveningParams: ILocation = {
        name: `nameevening${index}`,
        type: 'type',
        partsOfDay: ['afternoon'],
        description: 'description',
        siteLink: 'http://derp.com',
        address: 'address',
        zipcode: 75010,
      }

      const eveningLocation = new Location(eveningParams)
      locations.push(eveningLocation.save())
    })

    Array.from(Array(4)).forEach((val, index) => {
      const morningParams: ILocation = {
        name: `namemorning${index}`,
        type: 'type',
        partsOfDay: ['morning'],
        description: 'description',
        siteLink: 'http://derp.com',
        address: 'address',
        zipcode: 75010,
      }

      const morningLocation = new Location(morningParams)

      locations.push(morningLocation.save())
    })
    Promise.all(locations).then((locs) => {
      done()
    })
  })

  it('should return an itinerary of 3 days', (done) => {
    Builder.buildItinerary(3).then((itinerary) => {
      expect(itinerary.length).to.equal(3)
      done()
    })
  })

  it('should split mornings and evenings', (done) => {
    Builder.buildItinerary(3).then((itinerary) => {
      expect(itinerary[0].morning.partsOfDay).to.contain('morning')
      done()
    })
  })
})

