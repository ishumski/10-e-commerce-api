const mongoose = require('mongoose')
const {ObjectId} = require("mongodb");


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

ReviewSchema.statics.calculateAverageRating = async function (productId) {
    const result = await this.aggregate([
        {
            $match: {
                product: productId
            }
        }, {
            $group: {
                _id: null,
                averageRating: {
                    $avg: '$rating'
                },
                numOfReviews: {
                    $sum: 1
                }
            }
        }
    ])
    try {
        await this.model('Product').findOneAndUpdate(
            {_id: productId},
            {
                averageRating: Math.ceil(result[0]?.averageRating || 0),
                numOfReviews: result[0]?.numOfReviews || 0
            }
        )
    } catch (e) {
        console.log(e)
    }
}

ReviewSchema.post('save', async function () {
    await this.constructor.calculateAverageRating(this.product)
})
ReviewSchema.post('remove', async function () {
    await this.constructor.calculateAverageRating(this.product)
})

module.exports = mongoose.model('Review', ReviewSchema)
