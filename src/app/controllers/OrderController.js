const LoadProductService = require('../services/LoadProductService')
const Users  = require('../models/users')
const mailer = require('../../lib/nodemailer')



const email = (seller, product, buyer) =>  `
<h2> Olá ${seller.name} </h2>
<p> Você tem um novo pedido de compra do  seu produto </p>
<p> Produto : ${product.name} </p>
<p> Preço : ${product.formattedPrice} </p>
<p> <br></br> </p>
<h3>Dados do Comprador</h3>
<p><strong>Nome : </strong> ${buyer.name}</p>
<p><strong>Email : </strong>: ${buyer.email}</p>
<p><strong>Endereço: </strong> : ${buyer.address}</p>
<p><strong>Cep : </strong> ${buyer.cep}</p>
<p> <br></br> </p>
<p> <strong> Entre em contacto com o comprador para finalizar a venda! </strong> </p>
<p> <br></br> </p>
<p> Atenciosamente, Equipe da Launchstore </p>

`


module.exports = {

   async  post(req, res){
        
    try {

        //pegar  os dados do product

        const product = await LoadProductService.load('product',{ 
            where : { id : req.body.id }
        })


        //os dados do vendedor

        const seller = await Users.findOne({where : { id : product.user_id }})

        // os dados do comprador

        const buyer = await Users.findOne({ where : { id : req.session.userId }})

        // enviar os dados de compra para o vendedor


        await mailer.sendMail({

            to: seller.email,
            from: "no-replay@launchstore.com.br",
            subject : "Novo pedido de compra ",
            html : email(seller, product, buyer)

        })

        //noficar o vendedor com alguma mensagem de sucesso

        return res.render('orders/success')
        


        
    } catch (error) {
        // ou error
       console.error(error)
       return res.render('orders/error')


    }


    }
}