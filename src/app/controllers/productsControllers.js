const category = require("../models/category");
const Product = require("../models/product");
const  {formtPrice} = require('../../lib/utils');

module.exports = {
  create(req, res) {
    //Pegar categorias

    category
      .all()
      .then(function (results) {
        const categories = results.rows;

        return res.render("products/create.njk", {
          categories,
        });
      })
      .catch(function (err) {
        throw new Error(err);
      });
  },

  async post(req, res) {
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "") {
        return res.send("please fill all fields");
      }
    }


    let results = await Product.create(req.body);
    const productID = results.rows[0].id;

    return res.redirect(`/products/${productID}`);
  },

  async edit(req, res) {
    


    let results = await Product.find(req.params.id);

    const product = results.rows[0];

    if(!product) return res.send("Product Not found");


    //Formatando Price
    product.price = formtPrice(product.price)
    product.old_price = formtPrice(product.old_price)






    results = await category.all();

    const categories = results.rows;

    return res.render("products/edit", {
      product,
      categories,
    });
  },

  async put(req, res){

    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "") {
        return res.send("please fill all fields" + " " +  key);
        
      }
    }

    
     req.body.price = req.body.price.replace(/\D/g,"")

     if(req.body.old_price != req.body.price){

      const oldProduct = await  Product.find(req.body.id)

      req.body.old_price = oldProduct.rows[0].price

      await Product.update(req.body)

      return res.redirect(`/products/${req.body.id}/edit`)

     }

  },
  
  async delete(req, res){

    await Product.delete(req.body.id)

    return res.redirect('/products/create')
  }

 
};
