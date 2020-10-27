const express = require("express")
const routes = express.Router()
const productsController = require('./app/controllers/productsControllers')
const multer = require('./app/middlewares/multer')



routes.get("/", function(req, res){
  return res.render('layout.njk')
})

routes.get('/ads/create', (req, res) => {
  return res.redirect('/produts/create')
})



routes.get('/products/create', productsController.create)
routes.get('/products/:id/edit', productsController.edit )

routes.post('/products', multer.array('photos', 6), productsController.post )

routes.put('/products', multer.array('photos', 6), productsController.put )

routes.delete('/products', productsController.delete )









module.exports = routes