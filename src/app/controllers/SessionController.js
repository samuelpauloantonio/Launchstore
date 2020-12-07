



   function loginForm(req, res){
        return res.render('session/login.njk')
    }


    function login(req, res){

        // usando o validate middleware
        // verificar se o usuario esta cadastrado
        // verificar se a senha bate
        // colocar o usurio na req.use 
        
        req.session.userId = req.user.id 
        
        return res.redirect('/users')
    }


    function logout(req, res){
      
        req.session.destroy()

        return res.redirect('/')
    }



    module.exports = {
        loginForm,
        login,
        logout
    }
