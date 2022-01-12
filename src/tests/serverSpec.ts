 import supertest from 'supertest'
import * as app from '../server'

//endpoint test
const request = supertest(app)

describe('test end point http://localhost:3000/ responses', () => {
    it('the api endpoint works fine with status 200', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})