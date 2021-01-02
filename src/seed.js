const { hash } = require('bcryptjs')
const faker = require('faker')


const Product = require('./app/models/product')
const Users = require('./app/models/users')
const File  = require('./app/models/File')

let userIds = []
const  totalUsers = 3
const totalProducts = 10 

async function createUsers (){
    const users = []
    const password  = await hash('1234', 8)
  



    while(users.length < totalUsers){

        users.push({
            name : faker.name.firstName() ,
            email : faker.internet.email(),
            password,
            cpf_cnpj : faker.random.number(99999),
            cep :faker.random.number(99999) ,
            address : faker.address.streetAddress()
        })
    }


    const userPromise = users.map( user => Users.create(user))

    userIds = await Promise.all(userPromise)
    
}







async function createProducts (){

    let products = []
    let productsIds = []




    while( products.length < totalProducts ){

        products.push({
            category_id : Math.ceil(Math.random() * 3),
            user_id : userIds[Math.floor(Math.random() * totalUsers)],
            name: faker.name.title(),
            description : faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
            old_price : faker.random.number(9999),
            price: faker.random.number(9999),
            quantity: faker.random.number(99),
            status : Math.round(Math.random()),
        })
    }



    const productPromise = products.map( product => Product.create(product))


   productsIds  = await Promise.all(productPromise)




    let files = []


    while(files.length < 50){
        files.push({
            name: faker.image.image(),
            path: `public/images/placeholder.png`,
            product_id : productsIds[Math.floor(Math.random() * totalProducts)]
        })
    }


    const filesPromise = await files.map(file => File.create(file))

    
     await Promise.all(filesPromise)



}






    

async function init(){
    await createUsers()
    await createProducts()
}init()
 

