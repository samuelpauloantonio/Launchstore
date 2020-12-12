const Users = require('../models/users')


const {formatCep, formatCpfCnpj} = require('../../lib/utils')

module.exports = {

    registerForm(req, res){
        return res.render('user/register.njk')
    },


   async show(req, res){



        const  { user } = req
       


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
    },

    async put(req, res){

        try{

            const { user } = req

            let { name, email, cpf_cnpj , cep, address }
             = req.body


             cpf_cnpj = cpf_cnpj.replace(/\D/g,"")
             cep = cep.replace(/\D/g,"")
             

             await Users.update(user.id, {
                 name, 
                 email,
                 cpf_cnpj,
                 cep,
                 address
             })

             return res.render('user/index', {
                 user : req.body,
                 success : 'Conta actualizada com sucesso'
             })

        }catch(err){
            console.error(err)
        }


    },


    async delete(req, res){

        try{
    
            await Users.delete(req.body.id)

           req.session.destroy()

           return res.render('session/login.njk', {
               success: "conta deletada com sucesso.!"
           })

        } catch(err){
            console.error(err)

            return res.render('user/index.njk',  {
                error: "Aconteceu algun erro ao deletar  o usuário"
            })
        } 
    }
}