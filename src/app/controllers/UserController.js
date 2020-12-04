const Users = require('../models/users')
const {formatCep, formatCpfCnpj} = require('../../lib/utils')

module.exports = {

    registerForm(req, res){
        return res.render('user/register.njk')
    },


   async show(req, res){


        const { userId : id } = req.session


        const user  = await Users.findOne({ where : {id} })


        if(!user) return res.render('user/register', {
            error: "Usuário não encontrado!"
        })


        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
        user.cep = formatCep(user.cep)


 
        return res.render('user/index.njk', { user } )
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