const Pool = require('pg').Pool
const conn = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbpractica',
  password: 'root',
  port: 5433,
})

module.exports = conn;