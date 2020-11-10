const express = require("express")
const HomeControllers = require("./app/controllers/HomeControllers")
const routes = express.Router()
const productsController = require('./app/controllers/productsControllers')
const multer = require('./app/middlewares/multer')



routes.get("/", HomeControllers.index)

routes.get('/ads/create', (req, res) => {
  return res.redirect('/produts/create')
})



routes.get('/products/create', productsController.create)
routes.get('/products/:id', productsController.show)
routes.get('/products/:id/edit', productsController.edit )

routes.post('/products', multer.array('photos', 6), productsController.post )

routes.put('/products', multer.array('photos', 6), productsController.put )

routes.delete('/products', productsController.delete )









module.exports = routes