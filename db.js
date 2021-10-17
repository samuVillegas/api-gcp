const { Pool } = require('pg');
require('dotenv').config()
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_DB
});
  
module.exports = pool;