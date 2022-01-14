
import dotenv from 'dotenv'
import { Pool } from 'pg'

// connect node app to postgres database through dotenv
dotenv.config();
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    ENV
} = process.env 

// recruite the method pool as the actual connection to the database
const client = new Pool({
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? 
    POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password : `${POSTGRES_PASSWORD}`
})

export default client