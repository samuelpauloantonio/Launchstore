
const LoadProductService = require("../services/LoadProductService");
const LoadOrdersService = require("../services/LoadOrdersService");
const Users = require("../models/users");
const Orders = require("../models/Orders");
const mailer = require("../../lib/nodemailer");
const Cart = require("../../lib/Cart");

const email = (seller, product, buyer, quantity, total) => `
<h2> Olá ${seller.name} </h2>
<p> Você tem um novo pedido de compra do  seu produto </p>
<p> Produto : ${product.name} </p>
<p> Preço : ${product.formattedPrice} </p>
<p></strong>Quantidade  a ser Comprada : </strong>${quantity}</p>
<p><strong>Total :</strong> ${formatPrice(total)}</p>
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
    async index(req, res) {
        try {
            
            const orders = await LoadOrdersService.load('orders', {
              where: {buyer_id : req.session.userId}
            })

            return res.render('orders/index', { orders })
        } catch (error) {
            console.error(error)
        }
    },
    async seller(req, res) {
      try {
          
          const seles = await LoadOrdersService.load('orders', {
            where: {seller_id : req.session.userId}
          })

          return res.render('orders/seles', { seles })
      } catch (error) {
          console.error(error)
      }
  },
    async post(req, res) {
        try {
          //pegar os produtos do carrinho
    
          const cart = Cart.init(req.session.cart);
    
          const buyer_id = req.session.userId;
    
          const filteredItems = cart.items.filter(
            (item) => item.product.user_id != buyer_id
          );
    
          //criar o pedido
    
          const createOrdersPromise = filteredItems.map(async (item) => {
            let { product, price: total, quantity } = item;
            const { price, id: product_id, user_id: seller_id } = product;
            const status = "open";
    
            const order = await Orders.create({
              seller_id,
              buyer_id,
              product_id,
              price,
              total,
              quantity,
              status,
            });
    
            //pegar  os dados do product
    
            product = await LoadProductService.load("product", {
              where: { id: product_id },
            });
    
            //os dados do vendedor
    
            const seller = await Users.findOne({ where: { id: seller_id } });
    
            // os dados do comprador
    
            const buyer = await Users.findOne({ where: { id: buyer_id } });
    
            // enviar os dados de compra para o vendedor
    
            await mailer.sendMail({
              to: seller.email,
              from: "no-replay@launchstore.com.br",
              subject: "Novo pedido de compra ",
              html: email(seller, product, buyer, quantity, total),
            });
    
    
           
     
            return order
          });
    
          await Promise.all(createOrdersPromise)
    
          //clear cart 
    
          delete req.session.cart
          Cart.init()
    
    
          //noficar o vendedor com alguma mensagem de sucesso
    
          return res.render("orders/success");
        } catch (error) {
          // ou error
          console.error(error);
          return res.render("orders/error");
        }
      }
    
    
}