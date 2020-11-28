"use strict";

var express = require("express");

var routes = express.Router();

var multer = require('../app/middlewares/multer');

var HomeControllers = require("../app/controllers/HomeController");

var UserController = require('../app/controllers/UserController');

var SectionController = require('../app/controllers/SectionController'); // const users = require('./users')
// const products = require('./products')
//Home


routes.get("/", HomeControllers.index); // Products 

var productsController = require('../app/controllers/productsController');

var searchController = require('../app/controllers/searchController'); //Products 


routes.get('/products/create', productsController.create); //Search 

routes.get('/products/search', searchController.index);
routes.get('/products/:id', productsController.show);
routes.get('/products/:id/edit', productsController.edit); //Files multer- Array e os metodos post, put e delete

routes.post('/products/', multer.array('photos', 6), productsController.post);
routes.put('/products/', multer.array('photos', 6), productsController.put);
routes["delete"]('/', productsController["delete"]); //Alias ou Atalhos

routes.get('/products/ads/create', function (req, res) {
  return res.redirect('/create');
});
routes.get('/users/account', function (req, res) {
  return res.redirect('/users/register');
}); // //  routes.use('/products', products)
// //  routes.use('/users', users)
// //Controle de usuario
// //login/logout 
// // routes.get('/login', SectionController.loginFom)                 
// // routes.post('/login',SectionController.login)
// // routes.post('/logout', SectionController.logout)
// // // reset password / forgot
// // routes.get('/forgot-password', SectionController.forgotFom)
// // routes.get('/reset-password', SectionController.resetFom)
// // routes.post('/forgot-password', SectionController.forgotFom)
// // routes.post('/reset-password', SectionController.resetFom)
// // //user register UserController

routes.get('/users/register', UserController.registerForm); // // routes.post('/register', UserController.post)
// // routes.get('/', UserController.show)
// // routes.put('/', UserController.put)
// // routes.delete('/', UserController.delete)

module.exports = routes;