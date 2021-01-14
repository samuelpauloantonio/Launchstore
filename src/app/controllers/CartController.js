
const { addOne } = require('../../lib/Cart')
const Cart = require('../../lib/Cart')

const LoadProductService = require('../services/LoadProductService')

module.exports = {


   async  index(req, res){


        try {

           let { cart } = req.session 


            cart = Cart.init(cart)


            console.log(req.session.cart)

            return res.render('Cart/index', { cart })

        } catch (error) {
            console.error(error) 
        }


    },

    async addOne(req, res){

        // pegar  o id  do produto na req.params e pegar o produto atravez desse id

        const { id } = req.params 

        const product = await LoadProductService.load('product', {where : { id }})

        // pegar o carrinho na req.session 

        let { cart } = req.session

        // add o produto ao carrinho (usando o nosso gerenciador de carrinho)

        cart   = Cart.init(cart).addOne(product)

       
        // actualizar a req.session com este carrinho

        req.session.cart = cart

        // redirecionar o usuário para a tela do carrinho

        return res.redirect('/cart')
    },

    removeOne(req, res){

        // pegar o  id do produto a ser removido

        const { id } = req.params

        //pegar o  carrinho da sessão 

        let { cart } = req.session

        // se não tiver o carrinho retorna
        
        if(!cart) return  res.redirect('/cart')

        // iniciar o carrinho  (gerenciador de carrinho )e remover 

        cart = Cart.init(cart).removeOne(id)
        
        //actualizar o carrinho da sessão , removendo 1 item

        req.session.cart = cart 

        // redirecionar para a pagina cart

        return res.redirect('/cart')
    }
}