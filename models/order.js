const mongoose = require('mongoose')

const SingleOrderItemSchema = mongoose.Schema({
    name: {type: String, require: true},
    image: {type: String, require: true},
    price: {type: Number, require: true},
    amount: {type: Number, require: true},
    product:{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
})

const OrderSchema = mongoose.Schema({
        tax: {
            type: Number,
            require: true
        },
        shippingFee: {
            type: Number,
            require: true
        },
        subtotal: {
            type: Number,
            require: true
        },
        total: {
            type: Number,
            require: true
        },
        orderItems: [SingleOrderItemSchema],
        status: {
            type: String,
            enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
            default: 'pending'
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        clientSecret: {
            type: String
        },
        paymentIntentId: {
            type: String
        },

    }, {timestamps: true}
)

module.exports = mongoose.model('Order', OrderSchema)