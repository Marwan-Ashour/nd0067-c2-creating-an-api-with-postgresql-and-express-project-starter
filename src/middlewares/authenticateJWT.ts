import dotenv from 'dotenv'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

dotenv.config()

// jwt validation to endpoint
// protect private routes by requiring jwt validation in a replicable behavior
 
const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    // passing the JWTs as a special header
    // locate the authHeader sent with the req
    const authorizationHeader = req.headers.authorization
    if (typeof authorizationHeader !== 'undefined') {
      // parsing the header to get the token out of the authHeader by adding space and getting the 2nd item(the token)
      const token = authorizationHeader.split(' ')[1]
      if (process.env.TOKEN_SECRET) {
        jwt.verify(token, process.env.TOKEN_SECRET)
        next()
      }
    }
  } catch (err) {
    res.status(401)
    res.json('Access failed, invalid token')
  }
}

export default verifyAuthToken
