import express, { Request, Response } from 'express'
import verifyAuthToken from '../middlewares/authenticateJWT'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const index = async (req: Request, res: Response) => {
  try {
    const product: Product[] = await store.index()
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const product: Product = await store.show(req.body.product_id)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      product_name: req.body.product_name,
      product_price: req.body.product_price}

    const newProduct: Product = await store.create(product)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const productsRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products/create', verifyAuthToken, create)
}

export default productsRoutes