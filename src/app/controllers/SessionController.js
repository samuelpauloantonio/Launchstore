

module.exports = {

    loginForm(req, res){
        return res.render('session/login.njk')
    },


    login(req, res){

        // usando o validate middleware
        // verificar se o usuario esta cadastrado
        // verificar se a senha bate
        // colocar o usurio na req.use 
        
        req.session.userId = req.user.id 

        return res.redirect('/users')
    },


    logout(req, res){
        req.session.destroy()

        return res.redirect('/')
    }
}