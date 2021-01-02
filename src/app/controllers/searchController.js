const Product = require("../models/product");
const {
  formatPrice
} = require("../../lib/utils");

module.exports = {
  async index(req, res) {

    try {

      let params = {};

      const {
        filter,
        category
      } = req.query;

      if (!filter) return res.redirect("/");

      params.filter = filter;

      if (category) {
        params.category = category;
      }

      let products = await Product.search(params);

      async function getImage(product_id) {
        let files = await Product.files(product_id);
        files = files.map(
          (file) =>
          `${req.protocol}://${req.headers.host}${file.path.replace(
             "public",
             ""
           )}`
        );

        return files[0];
      }

      const productPromise = product.map(async (product) => {
        product.img = await getImage(product.id);
        product.oldPrice = formatPrice(product.old_price);
        product.price = formatPrice(product.price);

        return product;
      });

      products = await Promise.all(productPromise);

      const search = {
        term: req.query.filter,
        total: products.length,
      };

      const categories = products
        .map((product) => ({
          id: product.category_id,
          name: product.category_name,
        }))
        .reduce((categoryFiltered, category) => {
          const found = categoryFiltered.some((cat) => cat.id == category.id);

          if (!found) categoryFiltered.push(category);

          return categoryFiltered;
        }, []);

      return res.render("search/index", {
        products,
        search,
        categories
      });
    } catch (error) {
      console.error(error)
    }
  },
};
