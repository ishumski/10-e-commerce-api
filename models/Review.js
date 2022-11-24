const mongoose = require('mongoose')


const ReviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        default: 0,
    },
    title: {
        type: String,
        trim: true,
        require: [true, 'Please, provide title'],
        maxLength: 100
    },
    description: {
        type: String,
        trim: true,
        require: [true, 'Please, provide description']
    },
    comment: {
        type: String,
        require: [true, 'Please, provide comment']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        require: true
    },
}, {timestamps: true})

ReviewSchema.index({product: 1, user: 1}, {unique: true})

module.exports = mongoose.model('Review', ReviewSchema)
