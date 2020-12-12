const bancodeDados = require('../../config/BD_conection')
const { hash }  = require("bcryptjs")
const Products  = require('../models/product')

const  fs  =require('fs')
 
module.exports = {

    async create(data){

        try {
          const query = `
        INSERT INTO  users (
          name,
          email,
          password,
          cpf_cnpj, 
          cep,
          address
            
        ) VALUES($1, $2, $3, $4, $5, $6)
        RETURNING id
      `
      
       //hash de senha
       const passwordHash = await hash(data.password, 8)
       
  
      const values = [
        data.name,
        data.email.trim(),
        passwordHash,
        data.cpf_cnpj.replace(/\D/g,""),
        data.cep.replace(/\D/g,""),
        data.address
      ] 
  
       const results = await bancodeDados.query(query, values)

       return results.rows[0].id


        } catch(err) {
            console.error(err)
        }

    } ,


//check if email and cpfncpj existes || users
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
   },


   async update(id, fields){
      let query = 'UPDATE users SET'

      Object.keys(fields).map(( key, index, array ) => {

        if(index + 1 < array.length){
          query =`${query}
          ${key} ='${fields[key]}',
          `
        }else{
          //last position or interation

          query =`${query} 
          ${key} ='${fields[key]}'
          WHERE id =${id}
        `
        }
      })

      await bancodeDados.query(query)
   },


  async  delete(id){

      //pegar todos os productos  de apenas um usuário

      let results  = await bancodeDados.query(`SELECT * FROM products WHERE user_id = $1`, [id])

      const products  = results.rows


      // dos produtos pegar todas as imagens 

      const allFilesPromise = products.map(product => 
        Products.files(product.id))

      let promiseResults = await Promise.all(allFilesPromise)


      // rodar a remoção do usuário

      await bancodeDados.query(`DELETE FROM users WHERE id = $1`, [id])

      //remover as imagens da pasta public

      promiseResults.map(results => {
        results.rows.map(file =>  fs.unlinkSync(file.path))
      })


      

   }
 



}

