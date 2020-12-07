const express = require("express")
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const  ValidatorUsers = require('../app/validators/user')
const  ValidatorSession = require('../app/validators/session')
const { onlyUSers } = require('../app/middlewares/session')



const HomeControllers = require("../app/controllers/HomeController")
const UserController = require('../app/controllers/UserController')
const sessionControler = require('../app/controllers/SessionController')

// const users = require('./users')
// const products = require('./products')


//Home
routes.get("/", HomeControllers.index)


// Products 

const productsController = require('../app/controllers/productsController')
const searchController = require('../app/controllers/searchController')



//Products 

routes.get('/products/create', onlyUSers, productsController.create)
//Search 
routes.get('/products/search', onlyUSers , searchController.index)





routes.get('/products/:id', productsController.show)
routes.get('/products/:id/edit', productsController.edit )


//Files multer- Array e os metodos post, put e delete
routes.post('/products/', multer.array('photos', 6), productsController.post )
routes.put('/products/', multer.array('photos', 6), productsController.put )
routes.delete('/', productsController.delete )



//Alias ou Atalhos
routes.get('/products/ads/create', (req, res) => {
    return res.redirect('/create')
  })
  
  
  routes.get('/users/account', (req, res) => {
    return res.redirect('/users/register')
  })
  







// //  routes.use('/products', products)
// //  routes.use('/users', users)




// //Controle de usuario

// //login/logout 

routes.get('/users/login', sessionControler.loginForm)                 
routes.post('/users/login', ValidatorSession.login ,sessionControler.login)
routes.post('/users/logout', sessionControler.logout)

// // // reset password / forgot

// // routes.get('/forgot-password', sessionControler.forgotFom)
// // routes.get('/reset-password', sessionControler.resetFom)

// // routes.post('/forgot-password', sessionControler.forgotFom)
// // routes.post('/reset-password', sessionControler.resetFom)



// // //user register UserController

routes.get('/users/register', UserController.registerForm)
 
routes.post('/users/register', ValidatorUsers.post, UserController.post)


 routes.get('/users', ValidatorUsers.show, UserController.show)
routes.put('/users', ValidatorUsers.put , UserController.put)
// // routes.delete('/', UserController.delete)











module.exports = routes