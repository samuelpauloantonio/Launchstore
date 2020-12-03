const Users = require('../models/users')
module.exports = {

    registerForm(req, res){
        return res.render('user/register.njk')
    },


    show(req, res){
        return res.send('Ok usuario Cadastrado!')
    },



    async post(req, res){

        // validação de usuario por meio  de middleware == tem um 
        // Middleware no Validator


        const userId = await Users.create(req.body)

        //controlo de sessao do usuario
        req.session.userId = userId

        return res.redirect('/users') 
    }
}