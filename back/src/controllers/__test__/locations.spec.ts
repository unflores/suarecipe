import app from '../../server'
import * as request from 'supertest'


const server = request(app)

describe('locations', () => {
  describe('get', () => {
    it('responds with a location array', async () => {

      await server
        .get('/api/locations/')
        .expect(200)
        .expect('derp')
    })
  })
})
