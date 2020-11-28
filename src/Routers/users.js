const express = require('express')
const routes = express()


const SectionController = require('../app/controllers/SectionController')
const UserController = require('../app/controllers/UserController')



//Controle de usuario

//login/logout 

// routes.get('/login', SectionController.loginFom)                 
// routes.post('/login',SectionController.login)
// routes.post('/logout', SectionController.logout)

// // reset password / forgot

// routes.get('/forgot-password', SectionController.forgotFom)
// routes.get('/reset-password', SectionController.resetFom)

// routes.post('/forgot-password', SectionController.forgotFom)
// routes.post('/reset-password', SectionController.resetFom)



// //user register UserController

 routes.get('/register', UserController.registerForm)
 
// routes.post('/register', UserController.post)


// routes.get('/', UserController.show)
// routes.put('/', UserController.put)
// routes.delete('/', UserController.delete)















module.exports = routes


