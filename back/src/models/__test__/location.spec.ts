import { expect } from 'chai'
import Location, { ILocation } from '../location'

describe('Location', () => {
  const subject = new Location({})

  test('requires name', (done) => {
    subject.validate((error) => {
      expect(error.errors.name).not.to.be(undefined)
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
      expect(error).to.be(null)
      const location2 = new Location(params)
      location2.save((error1) => {
        expect(error1.errors.name).not.to.be(undefined)
        done()
      })
    })
  })

  test('requires type', (done) => {
    subject.validate((error) => {
      expect(error.errors.type).not.to.be(undefined)
      done()
    })
  })

  test('requires zipcode', (done) => {
    subject.validate((error) => {
      expect(error.errors.zipcode).not.to.be(undefined)
      done()
    })
  })

  test('requires partsOfDay to have values from dayParts enum', (done) => {
    const location = new Location({ partsOfDay: ['derply'] })
    location.validate((error) => {
      expect(error.errors.partsOfDay).not.to.be(undefined)
      done()
    })
  })

  test('requires siteLink to be a url', (done) => {
    const location = new Location({ siteLink: 'derply' })
    location.validate((error) => {
      expect(error.errors.siteLink).not.to.be(undefined)
      done()
    })
  })
})
