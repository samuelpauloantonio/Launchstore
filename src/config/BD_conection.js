const { Pool } = require('pg')

module.exports = new Pool({
  name:"spa",
  password:51053455,
  host:"postgresql-18318-0.cloudclusters.net",
  port:18318,
  database:"launchstoreDB" 

}) 