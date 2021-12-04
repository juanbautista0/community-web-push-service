import dotenv from "dotenv"
import knex from "knex"
import * as Bookshelf from "bookshelf"

dotenv.config()

const dbConector = knex({
    client: process.env.DB_DRIVER,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        charset: process.env.DB_CHARSET
    },
    pool: {
        propagateCreateError: false
    }
})

const Db: Bookshelf = require('bookshelf')(dbConector)

export default Db;