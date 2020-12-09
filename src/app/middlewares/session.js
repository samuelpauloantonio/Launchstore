
function onlyUSers(req, res, next){
   
    if(!req.session.userId) { 
        return res.redirect('/users/login')
    }

    next()
}


function isLogedRedirectToUsers(req, res, next){

    if(req.session.userId) 
         return res.redirect('/users')

    next()
}



module.exports = {
    onlyUSers,
    isLogedRedirectToUsers
}