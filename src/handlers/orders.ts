import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import verifyAuthToken from '../middlewares/authenticateJWT'

const store = new OrderStore()
// expose current order by user
const show = async (req: Request, res: Response) => {
  try {
    const order: Order = await store.show(req.body.user_id)
    res.json(order)
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const ordersRoutes = (app: express.Application) => {
  app.get('/orders/:id', verifyAuthToken ,show)}

export default ordersRoutes