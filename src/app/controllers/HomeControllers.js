const Product = require("../models/product");
const  { formatPrice} = require('../../lib/utils');


module.exports  = {
    
   async index(req, res){
       let results = await Product.all()
       const products = results.rows

    
       if(!products) res.send("Product Not-found !")

       async function getImage(productID){
           let results = await Product.files(productID)

           const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

           return  files[0] 
       }

       const productPromise = products.map( async product =>{
           product.img = await getImage(product.id)
           product.oldPrice  = formatPrice(product.old_price)
           product.price  = formatPrice(product.price)

           return product
       }).filter((product, index )=> index > 2 ? false : true ) 

       const lastAdd = await Promise.all(productPromise)

       return res.render('home/index', { products : lastAdd})

   }
}