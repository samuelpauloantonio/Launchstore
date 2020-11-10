const bancodeDados = require('../../config/BD_conection')
const fs  = require('fs')

module.exports = {

      all(){
        return  bancodeDados.query(`
          SELECT * FROM products 
          ORDER BY updated_at DESC
        `)
      },
    create(dados) {

        const query = `
          INSERT INTO  products(

            category_id,
            user_id,
            name,
            description ,
            old_price,
            price,
            quantity,
            status
            
                      
          ) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id
        `
        
         dados.price = dados.price.replace(/\D/g,"")
    
        const values = [
          dados.category_id,
          dados.user_id || 1,
          dados.name,
          dados.description,
          dados.old_price || dados.price,
          dados.price,
          dados.quantity,
          dados.status || 1
        
        ] 
    
         return bancodeDados.query(query, values)
      },

      find(id){
        return bancodeDados.query(`SELECT * FROM products WHERE id  = $1`, [id])
      },

      update(dados){

        const query = `
          UPDATE products SET 

            category_id = ($1),
            user_id  = ($2),
            name  = ($3),
            description   = ($4) ,
            old_price  = ($5),
            price  = ($6),
            quantity  = ($7),
            status  = ($8)
          WHERE id = $9
        `
        
        const values = [
          dados.category_id,
          dados.user_id,
          dados.name,
          dados.description,
          dados.old_price,
          dados.price,
          dados.quantity,
          dados.status,
          dados.id
        
        ] 
    
         return bancodeDados.query(query, values)

      },


      delete(id){
        return bancodeDados.query(`DELETE FROM products WHERE id = $1`, [id])
      },

      files(id){
        return bancodeDados.query(`
          SELECT * FROM files WHERE product_id = $1`,[id])
      },

    
}