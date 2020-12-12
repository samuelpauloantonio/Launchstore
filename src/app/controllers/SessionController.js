
const crypto = require('crypto')
const Users = require('../models/users')
const { hash } = require('bcryptjs')
const nodeMailer = require('../../lib/nodemailer')



module.exports = {
    loginForm(req, res) {
        return res.render('session/login.njk')
    },
    
    
     login(req, res) {

        // usando o validate middleware
        // verificar se o usuario esta cadastrado
        // verificar se a senha bate
        // colocar o usurio na req.use 

        req.session.userId = req.user.id

        return res.redirect('/users')
    },


    logout(req, res) {

        req.session.destroy()

        return res.redirect('/')
    },
    
    
     forgotForm(req, res) {
        return res.render('session/forgot-password.njk')
    },

    async forgot(req, res) {

        const user = req.user
    

        try {

            // criar um token 

            const token = crypto.randomBytes(20).toString('hex')
 


            //criar a expiração  do  token 

            let now = new Date()

            now = now.setHours(now.getHours() + 1)

            await Users.update(user.id, {
                reset_token:token.trim(),
                reset_token_expires:now
            })



            // Enviado um email Para o Usuario  com o link de recuperação

            await nodeMailer.sendMail({
                from: '<suport@LaunchStore.com>', // sender address
                to: `${user.email}`, // list of receivers
                subject: "Esqueceu a sua senha?", // Subject line
                text: "Ola o Samuel parte do time da LaunchStore  ", // plain text body
                html: `
                <h2>Esquece a sua senha?</h2>
                <p>Não se preocupe Click no link abaixo para recuperar sua senha</p>
    
                <a href= "http://localhost:3000/users/reset-password?token=${token}" target="_blank"> Recuperar Senha </a>
                `,
            });


            // avisar  o usuario verifique o seu  emaeil

            return res.render('session/login.njk', {
                success: "Verifique o seu email para resetar sua senha!"
            })


        } catch (err) {
            console.error(err)
        }

        return res.render('session/forgot-password.njk')
    },
    resetForm(req, res) {
        return res.render('session/password-reset',{ token : req.query.token })
    },

    async reset(req, res){

        const user  = req.user
        let {password , token } = req.body


        try{

            //validator de session 

            //criar um hash de senha para o usuario
            

            const newPassword = await hash(password,8)
                
            // actualizar o usuário

            await Users.update(user.id, {
                password:newPassword,
                reset_token:"",
                reset_token_expires:""


            })


            return res.render('session/login.njk', {
                success : "Senha actualizada com sucesso"
            })

            //avizar que a senha foi actualizada


        }catch(err) {
            console.error(err)
            return res.render('session/password-reset', {
                token,
                error : "Aconteceu algun erro, tente novamente!"
            })
        }
    }



}
