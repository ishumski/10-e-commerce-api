const {StatusCodes} = require('http-status-codes')
const Order = require('../models/order')
const Product = require('../models/Product')
const CustomError = require('../errors')


const createOrder = async (req, res) => {
    const {items: cartItems, tax, shippingFee} = req.body

    if (!cartItems || !!cartItems.length) {
        throw new CustomError.BadRequestError('No cart items provided')
    }
    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please, provide tax and shippingFee')
    }

    let orderItems = []
    let subtotal = 0

    for (let item of cartItems) {
        const dbProduct = await Product.findOne({
            _id: item.product
        })
        if (!dbProduct) {
            throw new CustomError.NotFoundError(`No product with id ${item.product}`)
        }
        const {name, price, image, _id} = dbProduct
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image,
            product: _id
        }
        //add item to order array
        orderItems = [...orderItems, singleOrderItem]
        //calculate subtotal amount
        subtotal += item.amount + price
    }
    console.log(orderItems)
    console.log(subtotal)
}


const getAllOrders = async (req, res) => {

}
const getSingleOrder = async (req, res) => {
    res.send('getSingleOrder')
}
const getCurrentUserOrders = async (req, res) => {
    res.send('getCurrentUserOrders')
}
const updateOrder = async (req, res) => {
    res.send('updateOrder')
}

module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
}