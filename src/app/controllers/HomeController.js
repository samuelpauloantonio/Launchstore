const Product = require("../models/product");
const  { formatPrice} = require('../../lib/utils');


module.exports  = {
    
   async index(req, res){
        
            const products = await Product.findAll()
    
         
            if(!products) res.send("Product Not-found !")
     
            async function getImage(productID){
                let files =  await Product.files(productID)
     
                files = files.map(file =>  `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
                
                return  files[0]
            }
     
            const productPromise = products.map( async product =>{
                product.img = await getImage(product.id)
                product.oldPrice  = formatPrice(product.old_price)
                product.price  = formatPrice(product.price)
                
                
                return product
            }).filter((product, index )=> index > 2 ? false : true ) 
     
            const lastAdd = await Promise.all(productPromise)
            

            // let b = await Product.find(1)

            //     const product = b.rows[0]


            //     console.log(b)


             return res.render('home/index', { products : lastAdd})

        

      


   }
}