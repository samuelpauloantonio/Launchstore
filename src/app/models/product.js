const bancodeDados = require('../../config/BD_conection')


module.exports = {

    
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
      }
}