const { Pool } = require('pg')

module.exports = new Pool({
  name:"spa",
  password:"51053455",
  host:"localhost",
  port:5434,
  database:"launchstoreDB" 

}) 