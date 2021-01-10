


const Users = require('../models/users')
const { compare } = require('bcryptjs')

// validação de usuario por meio  de middleware




function checkAllFields(body){
  const keys = Object.keys(body);
         
  for (let key of keys) {
    if (body[key] == "") {

      return {
        user : body,
        error : 'Por favor, preencha todos os campos.'
      }
    }
  }
}


module.exports = {

  async show(req, res, next){

    const { userId : id } = req.session
  
  
    const user  = await Users.findOne({ where : {id} })
  
  
    if(!user) return res.render('user/register', {
        error: "Usuário não encontrado!"
    })
  
  
  
    req.user = user
  
    next()
  
  },

  async post(req, res, next){
  
  
          //please fill all fields
  
          const fillAllFields = checkAllFields(req.body)

          if(fillAllFields){
            return res.render('user/register', fillAllFields)
          }
      
          //check if email and cpfncpj existes
  
          
          let  {email, cpf_cnpj, password , passwordRepeat } = req.body 
              
  
          cpf_cnpj = cpf_cnpj.replace(/\D/g,"")
  
          const user = await Users.findOne({
              where : {email},
              or: {cpf_cnpj}
          })
  
  
          if(user) return res.render('user/register', {
  
            //personalizando menssagens de erros
            user : req.body,
            error : "Usuário já Cadastrado."
          })
  
         // if password and repeatpassword is math
  
  
         if(password != passwordRepeat)
              return res.render('user/register', {
  
                //personalizando menssagens de erros
                user : req.body,
                error : "As Senhas não consciden"
              })
  
          
          //inportante chamar sempre o nex 
          // para avançar para continuar a execução da app
      next()
  },

  async put(req, res , next){
    //check all fields 

    const fillAllFields = checkAllFields(req.body)

          if(fillAllFields){
            return res.render('user/index', fillAllFields)
          }


      //verificar a password e o id

      const { password, id } = req.body

      if(!password) return  res.render('user/index', {
        user : req.body,
        error : "Coloque sua senha para actualizar o cadastro"
      })

      // verificar se é o  mesmo usuario

      const user  = await Users.findOne({where : {id} })

    

      const  passed =  await compare( password , user.password)


      if(!passed) return res.render('user/index', {
        user : req.body,
        error : "Senha incorreta"
      })


      req.user = user
 


      next()  

      
  }
}