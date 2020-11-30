const Users = require('../models/users')

module.exports = {

    registerForm(req, res){
        return res.render('user/register.njk')
    },



    async post(req, res){
        

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


        if(user) return res.send('users exites')

       // if password and repeatpassword is math


       if(password != passwordRepeat)
            return res.send('As pesswords não consciden')

        

            return res.send('pacced!')
    }
}