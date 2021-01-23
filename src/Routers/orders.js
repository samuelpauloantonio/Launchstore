const express = require("express");

const OrderController = require('../app/controllers/OrderController')
const { onlyUSers } = require('../app/middlewares/session')


const routes = express.Router();


routes.post('/', onlyUSers, OrderController.post)
        .get('/', onlyUSers, OrderController.index)
        .get('/sales', onlyUSers, OrderController.seller)
        .get('/:id', onlyUSers, OrderController.show)
        .post('/:id/:action', onlyUSers, OrderController.update)
        



module.exports = routes;
