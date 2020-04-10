import app from '../../server'
import * as request from 'supertest'

const server = request(app)

describe('ingredients', () => {
  describe('get', () => {
    it('responds with a ingredient array', async () => {
      await server
        .get('/api/ingredients/')
        .expect(200)
        .expect('derp')
    })
  })
})
