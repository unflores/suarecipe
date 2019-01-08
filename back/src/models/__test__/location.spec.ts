import Location, { ILocation } from '../location'

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
    const params: ILocation = {
      name: 'name',
      type: 'type',
      partsOfDay: ['night'],
      description: 'description',
      siteLink: 'http://derp.com',
      price: 38,
      address: 'street',
      zipcode: 75010,
    }
    const location = new Location(params)

    location.save((error) => {
      expect(error).toBe(null)
      const location2 = new Location(params)
      location2.save((error1) => {
        expect(error1.errors.name).not.toBe(undefined)
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
    const location = new Location({ partsOfDay: ['derply'] })
    location.validate((error) => {
      expect(error.errors.partsOfDay).not.toBe(undefined)
      done()
    })
  })

  test('requires siteLink to be a url', (done) => {
    const location = new Location({ siteLink: 'derply' })
    location.validate((error) => {
      expect(error.errors.siteLink).not.toBe(undefined)
      done()
    })
  })
})
