const bancodeDados = require('../../config/BD_conection')

const fs = require("fs")


module.exports = {
    create({filename, path, product_id }) {

        const query = `
          INSERT INTO  files(
            name,
            path,
            product_id
        
          ) VALUES($1, $2, $3)
          RETURNING id
        `
        
    
        const values = [
          filename,
          path,
          product_id
        ] 
    
         return bancodeDados.query(query, values)
      },
      
      async deleteImage(id){

        try{
  
          const results = await bancodeDados.query(`SELECT * FROM files WHERE id = $1 `, [id])
  
          const file = results.rows[0]
  
          fs.unlinkSync(file.path)
  
          return bancodeDados.query(`
          DELETE FROM files WHERE id = $1
          `, [id])
  
  
          
        }catch(error){
          console.error(error)
        }


        
        }


}