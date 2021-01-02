
const { unlinkSync }  = require('fs')

const category = require("../models/category");
const Product = require("../models/product");
const File = require('../models/File')


const {
  formatPrice,
  date
} = require('../../lib/utils');




module.exports = {
 async  create(req, res) {
    //Pegar categorias 
    try {
      const categories = await category.findAll()
      return res.render("products/create.njk", {
        categories
      });

    } catch (error) {
      console.error(error)
    }

  },


  async post(req, res) {
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "") {
        return res.send("please fill all fields");
      }
    }

    //verificao de imagens
    if (req.files.length == 0) {
      return res.send('Please, send at least one image')
    }


    try {


      let {
        category_id,
        user_id,
        name,
        description,
        old_price,
        price,
        quantity,
        status
      } = req.body


      price = price.replace(/\D/g, "")


      const product_id = await Product.create({
        category_id,
        user_id: req.session.userId ,
        name,
        description,
        old_price: old_price || price,
        price,
        quantity,
        status: status || 1
      })



      const filesPromise = req.files.map(file =>
        File.create({
          name : file.filename, path : file.path,
          product_id
        }))

      await Promise.all(filesPromise)

      return res.redirect(`/products/${product_id}/edit`);


    } catch (error) {
      console.error(error)
    }
  },



  async show(req, res) {

    try {

      const product  = await Product.find(req.params.id)

  
      if (!product) return res.send('Product Not-found')



      const {
        day,
        hour,
        minutes,
        month,
        year
      } = date(product.updated_at)


      product.published = {
        day: `${day}/${month}/${year}`,
        hour: `${hour}h:${minutes}`,
      }

      product.old_price = formatPrice(product.old_price)
      product.price = formatPrice(product.price)

      let files = await Product.files(product.id)

      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
      }))


      return res.render('products/show', {
        product,
        files
      })
    } catch (err) {
      console.error(err)
    }

  },

  async edit(req, res) {

    try {

      const product = await Product.find(req.params.id);


      if (!product) return res.send("Product Not found");


      //Formatando Price
      product.price = formatPrice(product.price)
      product.old_price = formatPrice(product.old_price)





      //get categories
      const categories = await category.findAll();



      //get images

      let files = await Product.files(product.id)

      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
      }))

      return res.render("products/edit", {
        product,
        categories,
        files
      });
    } catch (error) {
      console.error(error)
    }

  },



  async put(req, res) {

    try {

      const keys = Object.keys(req.body)

      for (key of keys) {

        if (req.body[key] == "" && key != "removed_files") {
          return res.send("please fill all fields" + " " + key);

        }

      }



      if (req.files != 0) {
        const newFilePromise = req.files.map(file =>

          File.create({
            name : file.filename , path: file.path,
            product_id: req.body.id
          }))

        await Promise.all(newFilePromise)
      }


      if (req.body.removed_files) {

        const removedFiles = req.body.removed_files.split(",") //[1,2,3,]
        const lastIndex = removedFiles.length - 1

        removedFiles.splice(lastIndex, 1) //[1,2,3]

        const removedFilesPromise = removedFiles.map(id => File.delete(id))

        await Promise.all(removedFilesPromise)
      }




      req.body.price = req.body.price.replace(/\D/g, "")

      if (req.body.old_price != req.body.price) {

        const oldProduct = await Product.find(req.body.id)

        req.body.old_price = oldProduct.price

        await Product.update(req.body.id, {
          category_id: req.body.category_id,
          name: req.body.name,
          description: req.body.description,
          old_price: req.body.old_price,
          price: req.body.price,
          quantity: req.body.quantity,
          status: req.body.status
        })



        return res.redirect(`/products/${req.body.id}/edit`)

      }

    } catch (error) {
      console.error(error)
    }
  },

  async delete(req, res) {

    

    const files =  await  Product.files(req.body.id)

    await Product.delete(req.body.id)

    files.map( file => {
      try {
        unlinkSync(file.path)
      } catch (error) {
        console.error(error)
      }
    })


    return res.redirect('/')
  }


};
