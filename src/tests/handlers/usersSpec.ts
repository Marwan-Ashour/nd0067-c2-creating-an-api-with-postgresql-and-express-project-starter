import app from '../../server'
import supertest from 'supertest'

const request = supertest(app)
const users = [
  {
    user_name: 'Admin',
    first_name: 'Marwan',
    last_name: 'Ashour',
    user_password: 'admin_password'
  },
  {
    user_name: 'Boss',
    first_name: 'Hassan',
    last_name: 'Ali',
    user_password: 'boss_password'
  }
]

describe('user Test Endpoints', () => {
  let token: string

  it('api create should open with status 200', async () => {
    const response = await request.post('/users/create').send(users[0])
    expect(response.status).toBe(200)
    token = response.body})

  it('api signIn should open with status 200', async () => {
    const response = await request
      .post('/users/signIn')
      .send(users[0]).set('Approved', 'json')
    token = 'Bearer ' + response.body
    expect(response.status).toBe(200)})

  it('api index should open with status 200', async () => {
    const response = await request.get('/users').set('Authorization', token)
    expect(response.status).toBe(200)})

  it('api index should open with status 401 for invalid token', async () => {
     token = 'Bearer ' + token
    const response = await request.get('/users').set('Authorization', token)
    expect(response.status).toBe(401)})

              
  it('api show should open with status 200', async () => {
    const response = await request.get('/users/1').set('Authorization', token)
    expect(response.status).toBe(200)})
})