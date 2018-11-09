import mongooseConfig from '../../config/mongoose'
mongooseConfig()
import Location from '../location'

describe('Location', () => {
  const subject = new Location({})

  test('requires name', (done) => {
    subject.validate((error) => {
      expect(error.errors.name).not.toBe(undefined)
      done()
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
    const location = new Location({partsOfDay: 'derply'})
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
