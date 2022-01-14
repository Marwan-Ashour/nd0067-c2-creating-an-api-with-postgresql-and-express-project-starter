import app from '../../server'
import supertest from 'supertest'
import dotenv from 'dotenv'
import { User, UserStore } from '../../models/user'
import { Product } from '../../models/product'
import jwt from 'jsonwebtoken'

dotenv.config()

const request = supertest(app)
const store = new UserStore()

const products: Product[] = [
  {product_name: 'jacket', product_price: 50},
  {product_name: 'shirt' , product_price: 30}]

let token = ' ';
describe('Products Test Endpoints', () => {
  beforeAll(async () => {
    const admin: User = {
      user_name: 'Hero',
      first_name: 'Mero',
      last_name: 'Bero',
      user_password: 'hero_password'}

    const newAdmin = await store.create(admin)
    if (process.env.TOKEN_SECRET) {
      token = jwt.sign({ user: newAdmin }, process.env.TOKEN_SECRET)}
  })

  it('api create should open with status 200', async () => {
    token = 'Bearer ' + token
    const response = await request
      .post('/products/create').send(products[0]).set('Authorization', token)
    expect(response.status).toBe(200)
  })

  it('api index should open with status 200', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
  })

  it('api show must open with status 200', async () => {
    const response = await request.get('/products/1')
    expect(response.status).toBe(200)
  })
})