

require('dotenv').config()
const postgreSQL = require('pg')



const pool = new postgreSQL.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, 
});


module.exports = pool

