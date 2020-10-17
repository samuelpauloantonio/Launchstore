const express = require("express")
const routes = express.Router()
const productsController = require('./app/controllers/productsControllers')


routes.get("/", function(req, res){
  return res.render('layout.njk')
})

routes.get('/ads/create', (req, res) => {
  return res.redirect('/produts/create')
})



routes.get('/products/create', productsController.create)
routes.get('/products/:id/edit', productsController.edit )


routes.post('/products', productsController.post )







module.exports = routes