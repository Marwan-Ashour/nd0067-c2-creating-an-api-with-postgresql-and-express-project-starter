import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middlewares/authenticateJWT'
import { User, UserStore } from '../models/user'

dotenv.config()
let token = ' ';
const store = new UserStore()
// make sure that this file has access to all of the express methods & routes
// recruite the handlers and move the users routes from the server into them

// recruite the handler index to return/pass the list of all users as json
const index = async (req: Request, res: Response) => {
  try {
    const users: User[] = await store.index()
    res.json(users)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// recruite the handler show to return/pass only single user specified by id as json
const show = async (req: Request, res: Response) => {
  try {
    const user: User = await store.show(req.body.user_id)
    res.json(user)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// recruite the handler create to return/pass copy of the created user recently as json
const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_password: req.body.user_password}

    // after the new user is created
    const newUser = await store.create(user)
    // then create the token & store it, so the client can use it for the future http request
    if (process.env.TOKEN_SECRET) {
      token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET)
      res.json(token)
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// using the handler signIn to check and confirm whether the user exists
const signIn = async (req: Request, res: Response) => {
  const user: User = {
    user_name: req.body.user_name,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_password: req.body.user_password}
  try {
    const uzr = await store.authenticate(user.user_name, user.user_password)
    if (uzr) {
      if (process.env.TOKEN_SECRET) {
        token = jwt.sign({ user: uzr }, process.env.TOKEN_SECRET)
        res.json(token)
      }
    } else {res.send('Incorrect credentials,, either username or password ')}
  } catch (error) {
    res.status(401)
    res.json({ error })
  }
}

// all handlers connected to there urls properly

// token required
const usersRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users/create', create)
  app.post('/users/signIn', signIn)
}

export default usersRoutes
