
import bcrypt from 'bcrypt'
import Client from '../database'

const saltRounds = process.env.SALT_ROUNDS
export type User = {
  user_id?: number,
  user_name: string,
  first_name: string,
  last_name: string,
  user_password: string}

export class UserStore {
  async index(): Promise<User[]> {
    // encapsulate the whole mission in try/catch statement, in case anything goes wrong
    try {
       
       // start the connection with the db
      const conn = await Client.connect()
      // getting in and then we can talk to the db
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      // end the connection after getting the mission done
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  //show specific user by user_id
  async show(id: number): Promise<User> {
    try {
      const sql =
        'SELECT * FROM users WHERE user_id=($1)'
        
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not get user ${id}. Error: ${err}`)
    }
  }


  async create(uzr: User): Promise<User> {
    try {
      if (saltRounds) {
        // hashing the user's password & concatenate with pepper & pass in the env variable for saltrounds
        const hash = bcrypt.hashSync(
            uzr.user_password + process.env.BCRYPT_PASSWORD,
          parseInt(saltRounds)
        )
        
        const conn = await Client.connect()
        const sql =
          'INSERT INTO users (user_name, first_name, last_name, user_password) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await conn.query(sql, [uzr.user_name, uzr.first_name, uzr.last_name, hash])
        const user = result.rows[0]
        conn.release()
        return user
      } else {
        throw new Error('env.SALT_ROUNDS could not found')
      }
    } catch (err) {
      throw new Error(`could not add user (${uzr.user_name}): ${err}`)
    }
  }
   // validate the password at user sign in
  async authenticate(
    user_name: string,
    user_password: string): Promise<User | null> {
    const conn = await Client.connect()
    // first, will check user by user to check whether user account w/user name exists or not?
    const sql = 'SELECT user_password FROM users WHERE user_name=($1)'
    const result = await conn.query(sql, [user_name])
    // second, will check whether we get a response from the sql query
    if (result.rows.length) {
      const user = result.rows[0]
      if (
        // third, match the incoming password with database stored one
        bcrypt.compareSync(
          user_password + process.env.BCRYPT_PASSWORD,
          user.user_password
        )
      ) {
        return user
      } else {
        throw new Error('Incorrect password, please enter the correct one.')
      }
    }
    //fourth, if the authentication failed, abort the process and return a message to the user
    conn.release()
    return null
  }


  //  async delete(id: number): Promise<User> {
  //   try {
  //     const sql = 'DELETE FROM users WHERE id=($1)'
  //       // @ts-ignore
  //       const conn = await Client.connect()

  //       const result = await conn.query(sql, [id])

  //       const user = result.rows[0]

  //       conn.release()

  //       return user  
  //   } catch (err) {
  //       throw new Error(`Could not delete user ${id}. Error: ${err}`)
  //   }
  // }
}