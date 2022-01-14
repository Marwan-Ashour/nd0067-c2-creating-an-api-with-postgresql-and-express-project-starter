import app from '../../server'
import dotenv from 'dotenv'
import Client from '../../database'
import supertest from 'supertest'
import { User, UserStore } from '../../models/user'
import jwt from 'jsonwebtoken'


dotenv.config()
const request = supertest(app)
const userStore = new UserStore()

let token = ' ';

describe('Orders Test Endpoints', () => {
  beforeAll(async () => {
    const boss: User = {
      user_name: 'MaAs',
      first_name: 'Mar',
      last_name: 'Wan',
      user_password: 'maas_password'}

    const newBoss = await userStore.create(boss)
    if (process.env.TOKEN_SECRET) {
      token = jwt.sign({ user: newBoss }, 
              process.env.TOKEN_SECRET)}

    const conn = await Client.connect()
    const sql ='INSERT INTO orders (order_id, user_id, order_status) VALUES($1, $2, $3) RETURNING *'
    const result = await conn.query(sql, [95, newBoss.user_id, 'active'])
    const order = result.rows[0]
    conn.release()
    return order
  })

  it('api show should open with status 200', async () => {
    token = 'Bearer ' + token
    const response = await request.get('/orders/1').set('Authorization', token)
    expect(response.status).toBe(200)
  })
})