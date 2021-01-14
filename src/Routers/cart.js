const express = require("express");

const CartController = require("../app/controllers/CartController");

const routes = express.Router();

routes.get("/", CartController.index)
.post('/:id/add-one', CartController.addOne)
.post('/:id/remove-one', CartController.removeOne)
















module.exports = routes;
