
const { formatPrice } = require('./utils')


const Cart = {
    //carrinho fica guardado na sessão (req.session)

    init(oldcart){

        if(oldcart){
            this.items  = oldcart.items;
            this.total = oldcart.total;
        }else{
            this.items = []
            this.total = {
                quantity : 0,
                price : 0,
                formattedPrice : formatPrice(0)
            }
        }

        return this
        
    },

    addOne(product){

        //ver se já  existe produto no carrnho

        let inCart = this.getCartItem(product.id)


        if(!inCart){
            inCart = {
                product : {
                    ...product,
                    formattedPrice : formatPrice(product.price)
                },

                quantity : 0,
                price : 0,
                formattedPrice : formatPrice(0)
            }

            this.items.push(inCart)
        }

        //quantity exceed 

        if(inCart.quantity >= product.quantity) return this


        //update item or product
        inCart.quantity++
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formattedPrice  = formatPrice(inCart.price)

        //update cart all cart 
        this.total.quantity++
        this.total.price += inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)


        return this

    },
    remoceOne(productId){

        let inCart  = this.getCartItem(productId)


        if(!inCart) return this

        // update item 

        inCart.quantity--
        inCart.price = inCart.product.price  * inCart.product.quantity
        inCart.formattedPrice = formatPrice(inCart.price)



        //atualizar o carrinho

        this.total.quantity--
        this.total.price -= inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)


        if(inCart.quantity < 1){
        
            this.items = this.items.filter(item => 
                 item.product.id != inCart.product.id )
            
                 return this
        }


        return this

    },
    delete(productId){

        const inCart = this.getCartItem(productId)

        if(!inCart) return this

        if(this.items.length > 0){
            this.total.quantity -= inCart.quantity
            this.total.price  -= (inCart.product.price * inCart.quantity)
            this.total.formattedPrice = formatPrice(this.total.price)

        }


        this.items = this.items.filter(item => inCart.product.id != item.product.id)

        return this
    },
    getCartItem(productId){
        return  this.items.find( item => item.product.id  == productId )
    }



    
    
}



const product = {
    id: 1,
    price : 199,
    quantity : 2
}


console.log('add firts card item ')
let oldcart = Cart.init().addOne(product)
console.log(oldcart)


console.log('add second cart item')
oldcart = Cart.init(oldcart).addOne(product)
console.log(oldcart)


console.log('delete one  item  ')
oldcart = Cart.init(oldcart).delete(product.id)
console.log(oldcart)


module.exports  = Cart;