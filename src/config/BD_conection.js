const { Pool } = require('pg')

module.exports = new Pool({
  name:"spa",
  password:"51053455",
  host:"locahost",
  port:5434,
  database:"launchstoreDB" 

}) 