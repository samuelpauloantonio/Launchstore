
const Users = require('../models/users')
const { compare } = require('bcryptjs')


async function login(req, res, next){

    const { email, password } = req.body 
  
    const  user = await Users.findOne({where : {email}})


    if(!user) return  res.render('session/login', {
        user : req.body,
        error : "Usuário não cadastrado!"
    })


    const  passed  = await compare(password , user.password)


    if(!passed) return res.render('session/login', {
        user : req.body,
        error : "Senha incorreta"
    })


    req.user = user

    next()


}


async function forgot(req, res, next){
   
    const { email} = req.body 
    try{
   
  
        const  user = await Users.findOne({where : {email}})
    
    
        if(!user) return  res.render('session/forgot-password', {
            user : req.body,
            error : "Usuário não Encotrado!"
        })

       

        req.user = user

   
        
        next()

    }
    catch(err){
        console.error(err)
        
    }

    

}

async function reset(req, res, next){

           //procurar o usuário
           const { email, password, passwordRepeat, token } = req.body 

           const  user = await Users.findOne({where : {email}})
       
       
           if(!user) return  res.render('session/password-reset', {
               user : req.body,
               token,
               error : "Usuário não cadastrado!"
           })
       

            // ver se a senha bate

            if(password != passwordRepeat)
            return res.render('session/password-reset', {

              //personalizando menssagens de erros
              user : req.body,
              token,
              error : "As Senhas não Consciden"
            })


            //verificar o token  bate
           
            
            if(token != user.reset_token)  return res.render('session/password-reset', {

                user : req.body,
                token,
                error : "Token inválido! Solicite uma nova recupeção de senha."
              })
  

            //verificar se o token expirou

            let now  = new Date()

                now  = now.setHours(now.getHours())

                if(now > user.reset_token_expires)   return res.render('session/password-reset', {

                    //personalizando menssagens de erros
                    user : req.body,
                    token,
                    error : "Token expirado! Por favor solicite uma nova recuperação de senha"
                  })
      
            
            req.user  = user
            next()

}




module.exports = {
    login,
    forgot,
    reset
}