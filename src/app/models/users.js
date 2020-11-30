const bancodeDados = require('../../config/BD_conection')

module.exports = {
  async findOne(filters){
       let query = "SELECT * FROM  users"


       Object.keys(filters).map(key => {
           //where || or 
           query = `${query}
            ${key}
           `

           Object.keys(filters[key]).map(field => {
            query  = `${query} ${field} = '${filters[key][field]}'`
        })
 
       })

      

       const results  = await bancodeDados.query(query)

       return results.rows[0]
   }
}

