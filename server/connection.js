require('dotenv').config({path : '../.env'});
const {Pool} = require("pg")

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT
}
console.log(config);

const pool = new Pool(config)

module.exports = pool;