const express = require("express")
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const  ValidatorUsers = require('../app/validators/user')
const  ValidatorSession = require('../app/validators/session')
const { onlyUSers } = require('../app/middlewares/session')
const Validate = require('../app/validators/products')



const HomeControllers = require("../app/controllers/HomeController")
const UserController = require('../app/controllers/UserController')
const sessionControler = require('../app/controllers/SessionController')
const Cart = require('./cart')
const Orders = require('./orders')

// const users = require('./users')
// const products = require('./products')




//Home
routes.get("/", HomeControllers.index)

//cart 
routes.use('/cart', Cart)
routes.use('/orders', Orders)

// Products 

const productsController = require('../app/controllers/productsController')
const searchController = require('../app/controllers/searchController')



//Products 

routes.get('/products/create', onlyUSers, productsController.create)
//Search 
routes.get('/products/search' , searchController.index)





routes.get('/products/:id', productsController.show)
routes.get('/products/:id/edit', onlyUSers,  productsController.edit )


//Files multer- Array e os metodos post, put e delete
routes.post('/products/', onlyUSers, multer.array('photos', 6), Validate.post, productsController.post )
routes.put('/products/', onlyUSers, multer.array('photos', 6),Validate.put, productsController.put )
routes.delete('/products',  onlyUSers , productsController.delete )



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
    const { isLogedRedirectToUsers} = require('../app/middlewares/session')


routes.get('/users/login', isLogedRedirectToUsers,  sessionControler.loginForm)                 
routes.post('/users/login', ValidatorSession.login ,sessionControler.login)
routes.post('/users/logout', sessionControler.logout)

// // // reset password / forgot

routes.get('/users/forgot-password',  sessionControler.forgotForm)
routes.get('/users/reset-password', sessionControler.resetForm)

routes.post('/users/forgot-password',ValidatorSession.forgot , sessionControler.forgot)

routes.post('/users/reset-password', ValidatorSession.reset,  sessionControler.reset)



// // //user register UserController

routes.get('/users/register', UserController.registerForm)
 
routes.post('/users/register', ValidatorUsers.post, UserController.post)





 routes.get('/users', ValidatorUsers.show, UserController.show)
routes.put('/users', ValidatorUsers.put , UserController.put)
routes.delete('/users', UserController.delete)


//users show products

routes.get('/users/ads',onlyUSers, UserController.ads)














module.exports = routes