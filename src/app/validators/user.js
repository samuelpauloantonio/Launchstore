


const Users = require('../models/users')

// validação de usuario por meio  de middleware
async function post(req, res, next){


        //please fill all fields

        const keys = Object.keys(req.body);
       
        for (let key of keys) {
          if (req.body[key] == "") {
            return res.send("please fill all fields");
          }
        }
    
        //check if email and cpfncpj existes


        let  {email, cpf_cnpj, password , passwordRepeat } = req.body 
            

        cpf_cnpj = cpf_cnpj.replace(/\D/g,"")

        const user = await Users.findOne({
            where : {email},
            or: {cpf_cnpj}
        })


        if(user) return res.render('user/register', {

          user : req.body,
          error : "Usuário já Cadastrado."
        })

       // if password and repeatpassword is math


       if(password != passwordRepeat)
            return res.send('As pesswords não consciden')

        
        //inportante chamar sempre o nex 
        // para avançar para continuar a execução da app
    next()
}


module.exports = {
    post
}