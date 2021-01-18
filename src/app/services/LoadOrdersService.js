
const Users = require('../models/users')
const LoadProductService = require('../services/LoadProductService')
const { formatPrice, date } = require('../../lib/utils');
const Orders =  require('../models/Orders')  


async function format(order){

                // detalhes do produto 
                order.product = await LoadProductService.load('product', { where: { id: order.buyer_id } })
                // detalhes do comprador
                order.buyer = await Users.findOne({
                    where: { id: order.buyer_id }
                })

                // detalhes do vendedor 

                order.seller = await Users.findOne({
                    where: { id: order.seller_id }
                })

                //formatação do preço

                order.formattedPrice = formatPrice(order.price)
                order.formattedTotal = formatPrice(order.total)

                //formatação do status

                const statuses = {
                    open: "Aberto",
                    sold: "vendido",
                    canceled: "Cancelado"
                }

                order.formattedStatus = statuses[order.status]

                // formatação de actualizado em ...


                const updatedAt = date(order.updated_at)

                order.formattedUpdatedAt = `${order.formattedStatus} em
                 ${updatedAt.day}/${updatedAt.month}/${updatedAt.year} ás ${updatedAt.hour} horas : ${updatedAt.minutes} minutos`

                return order

   
}


const LoadService = {

    load(service, filter){
        this.filter  = filter
        return this[service]()
    },

   async  order(){

        try{

            const  order = await Orders.findOne(this.filter)
            return format(order)

        }catch(error){
            console.error(error)
        }

    },

    async orders(){

        try{

            const orders = await  Orders.findAll(this.filter)
            const OrdersPromise = orders.map(format)
            return  Promise.all(OrdersPromise)

        }catch(error){
            console.error(error)
        }

    },
    format,

}


module.exports = LoadService