"use strict";

var express = require("express");

var HomeControllers = require("./app/controllers/HomeControllers");

var routes = express.Router();

var productsController = require('./app/controllers/productsControllers');

var multer = require('./app/middlewares/multer');

var searchController = require('./app/controllers/searchController');

var product = require("./app/models/product"); //Home


routes.get("/", HomeControllers.index); //Search 

routes.get('/products/search', searchController.index);
routes.get('/ads/create', function (req, res) {
  return res.redirect('/produts/create');
}); //Products

routes.get('/products/create', productsController.create);
routes.get('/products/:id', productsController.show);
routes.get('/products/:id/edit', productsController.edit); //Files multer- Array e os metodos post, put e delete

routes.post('/products', multer.array('photos', 6), productsController.post);
routes.put('/products', multer.array('photos', 6), productsController.put);
routes["delete"]('/products', productsController["delete"]);
module.exports = routes;