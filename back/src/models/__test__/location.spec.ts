import Location from '../location'
import {ILocation} from '../location'

process.env.TEST_SUITE = 'seed-spec'

describe('Location', () => {
  const subject = new Location({})

  test('requires name', (done) => {
    subject.validate((error) => {
      expect(error.errors.name).not.toBe(undefined)
      done()
    })
  })

  test('name is unique', (done) => {
    let params: ILocation = {
      name: 'name',
      type: 'type',
      partsOfDay: ['night'],
      description: 'description',
      siteLink: 'http://derp.com',
      street: 'street',
      zipcode: 75010,
    }
    let location = new Location(params)

    location.save((error) => {
      expect(error).toBe(null)
      let location2 = new Location(params)
      location2.save((error) => {
        expect(error.errors.name).not.toBe(undefined)
        done()
      })
    })
  })

  test('requires type', (done) => {
    subject.validate((error) => {
      expect(error.errors.type).not.toBe(undefined)
      done()
    })
  })

  test('requires zipcode', (done) => {
    subject.validate((error) => {
      expect(error.errors.zipcode).not.toBe(undefined)
      done()
    })
  })

  test('requires partsOfDay to have values from dayParts enum', (done) => {
    const location = new Location({partsOfDay: ['derply']})
    location.validate((error) => {
      expect(error.errors.partsOfDay).not.toBe(undefined)
      done()
    })
  })

  test('requires siteLink to be a url', (done) => {
    const location = new Location({siteLink: 'derply'})
    location.validate((error) => {
      expect(error.errors.siteLink).not.toBe(undefined)
      done()
    })
  })

})