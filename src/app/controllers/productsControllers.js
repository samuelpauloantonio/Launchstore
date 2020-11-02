const category = require("../models/category");
const Product = require("../models/product");
const  { formtPrice } = require('../../lib/utils');
const File = require('../models/File')

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

    //verificao de imagens
   if(req.files.length == 0){
      return res.send('Please, send at least one image')
    } 

    let results = await Product.create(req.body);
    const product_id = results.rows[0].id;
 

   const filesPromise = req.files.map(file => File.create({ ...file , product_id }))

    await Promise.all(filesPromise)

  



    return res.redirect(`/products/${product_id}/edit`);
  },



  async edit(req, res) {
   

    let results = await Product.find(req.params.id);
    
    const product = results.rows[0];

    if(!product) return res.send("Product Not found");


    //Formatando Price
    product.price = formtPrice(product.price)
    product.old_price = formtPrice(product.old_price)





    //get categories
    results = await category.all();
    const categories = results.rows;


    //get images

    results = await Product.files(product.id)

    let files = results.rows

    files = files.map(file => ({
      ...file,
      src:`${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
    }) )

    return res.render("products/edit", {
      product,
      categories,
      files
    });
  },


async show(req,res){

  let results = await Product.find(req.params.id)

  const product = results.rows[0]

  if(!product) return res.send('product not-found')

  return res.render('products/show')
},

  async put(req, res){

    const keys =Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "" && key != "removed_files" ) {
        
        return res.send("please fill all fields" + " " +  key);
        
      }
    }



    if(req.files != 0){
      const newFilePromise  =  req.files.map(file => 

        File.create({...file , product_id : req.body.id }))

        await Promise.all(newFilePromise)
    }


    if(req.body.removed_files){
      
      const removedFiles = req.body.removed_files.split(",") //[1,2,3,]
      const lastIndex = removedFiles.length - 1
      
      removedFiles.splice(lastIndex, 1) //[1,2,3]

      const removedFilesPromise = removedFiles.map(id => File.deleteImage(id))

      await Promise.all(removedFilesPromise)
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
