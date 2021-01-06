
const Base = require('./Base')
const db = require('../../config/BD_conection')


Base.init({table : "products"})



const products = {
  ...Base,

 async  files(id){
   const  results = await db.query(`
      SELECT * FROM files WHERE product_id = $1
      
      `,[id])

      return results.rows
  },

  async search(params){

    const {filter, category} = params 

      let query = `
      SELECT products.*,
      categories.name AS category_name 
      FROM products 
      LEFT JOIN categories ON(categories.id = products.category_id)
    
      WHERE  1 = 1 
  
    `

        if(category){
          query += ` AND products.category_id = ${category}
          `
        }

        if(filter) {
          query += ` AND (products.name ILIKE '%${filter}%' OR
                     products.description ILIKE '%${filter}%')
        ` 
        }

       
        query += `AND status != 0`
       
       const results =  await db.query(query)
       return results.rows

  },

  filterBy(filter){
    try {
     return db.query(`
     SELECT products.*
     FROM products 
     WHERE products.name ILIKE '%${filter}%'
     ORDER BY name ASC
   `)
    } catch (error) {
      console.error(error)
    }
   },

}

module.exports = products


  


    
