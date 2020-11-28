const express = require('express')
const routes = express()


const multer = require('../app/middlewares/multer')


const productsController = require('../app/controllers/productsController')
const searchController = require('../app/controllers/searchController')

routes.get('/create', productsController.create)

//Search 
routes.get('/search', searchController.index)



//Products

routes.get('/:id', productsController.show)
routes.get('/:id/edit', productsController.edit )


//Files multer- Array e os metodos post, put e delete
routes.post('/', multer.array('photos', 6), productsController.post )
routes.put('/', multer.array('photos', 6), productsController.put )
routes.delete('/', productsController.delete )



//Alias ou Atalhos
routes.get('/ads/create', (req, res) => {
    return res.redirect('/create')
  })
  
  
  routes.get('/account', (req, res) => {
    return res.redirect('/users/register')
  })
  






module.exports = routes


