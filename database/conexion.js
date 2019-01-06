const Pool = require('pg').Pool
const conn = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbprueba',
  password: 'root',
  port: 5433,
})

module.exports = conn;