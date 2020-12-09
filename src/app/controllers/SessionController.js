


const  crypto  = require('crypto')
const  Users = require('../models/users')

function loginForm(req, res) {
    return res.render('session/login.njk')
}


function login(req, res) {

    // usando o validate middleware
    // verificar se o usuario esta cadastrado
    // verificar se a senha bate
    // colocar o usurio na req.use 

    req.session.userId = req.user.id

    return res.redirect('/users')
}


function logout(req, res) {

    req.session.destroy()

    return res.redirect('/')
}


function forgotForm(req, res) {
    return res.render('session/forgot-password.njk')
}

function forgotForm(req, res) {

    const user = req.user
    // criar um token 

    const token = crypto.randomBytes(20).toString('hex')


    // criar tempo de expiraçao do token

        let now = new Date()

        now = now.setHours(now.getHours() + 1)

        await Users.update(user.id, {
            reset_token : token,
            reset_token_expires : now
        })
    //enviar o link de recuperação para o usuario



    //avizar que enviamos o email

    return res.render('session/forgot-password.njk')
}
function resetForm(req, res) {
    return
}




module.exports = {
    loginForm,
    forgotForm,
    resetForm,
    login,
    logout
}
