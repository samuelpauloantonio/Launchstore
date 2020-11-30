
module.exports = {

    registerForm(req, res){
        return res.render('user/register.njk')
    },



    async post(req, res){

        // validação de usuario por meio  de middleware == tem um 
        // Middleware no Validator
        return res.send('pacced!')
    }
}