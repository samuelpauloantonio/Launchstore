const category = require("../models/category");
const Product = require("../models/product");
const  {formtPrice} = require('../../lib/utils')

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

    //Formatando Price
    product.price = formtPrice(product.price)
    product.old_price = formtPrice(product.old_price)

    if (!product) res.send("Product Not found");

    results = await category.all();

    const categories = results.rows;

    return res.render("products/edit", {
      product,
      categories,
    });
  },
};
