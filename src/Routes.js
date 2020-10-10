const express = require("express")
const routes = express.Router()
const ProductsController = require('./app/controllers/productsControllers')


routes.get("/", function(req, res){
  return res.render('layout.njk')
})

routes.get('/ads/create', (req, res) => {
  return res.redirect('/produts/create')
})



routes.get('/products/create', ProductsController.create)







module.exports = routes