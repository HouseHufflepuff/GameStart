require('dotenv').config()
const Pool = require("pg").Pool;
const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST
}