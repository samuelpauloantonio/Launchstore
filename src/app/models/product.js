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
    
    
        const values = [
          dados.category_id,
          2,
          dados.name,
          dados.description,
          dados.old_price,
          dados.price,
          dados.quantity,
          dados.status
        
        ]
    
         return bancodeDados.query(query, values)
      }
}