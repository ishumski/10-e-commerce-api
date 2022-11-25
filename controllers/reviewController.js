const {StatusCodes} = require('http-status-codes')
const {checkPermission} = require('../utils')
const CustomError = require('../errors')
const Review = require('../models/Review')
const Product = require('../models/Product')


const createReview = async (req, res) => {
    const {product: productId} = req.body
    const isValidProduct = await Product.findOne({_id: productId})

    if (!isValidProduct) {
        throw new CustomError.NotFoundError(`No product with is ${productId}`)
    }

    const alreadySubmitted = await Review.findOne({
        product: productId,
        user: req.user.userId
    })
    if (alreadySubmitted) {
        throw new CustomError.BadRequestError('Already submitted review for this product')
    }

    req.body.user = req.user.userId
    const review = await Review.create(req.body)
    res.status(StatusCodes.OK).json({review, count: review.length})
}

const getAllReviews = async (req, res) => {
    const review = await Review.find({})
        .populate({
            path: 'product',
            select: 'name company price'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })
    res.status(StatusCodes.CREATED).json({review, count: review.length})
}

const getSingleReview = async (req, res) => {
    const reviewId = req.params.id
    const review = await Review.findOne({_id: reviewId})
    if (!review) {
        throw new CustomError.BadRequestError(`No review with is ${reviewId}`)
    }
    res.status(StatusCodes.OK).json({review})
}

const updateReview = async (req, res) => {
    const reviewId = req.params.id
    const {rating, title, comment} = req.body
    const review = await Review.findOne({_id: reviewId})
    if (!review) {
        throw new CustomError.BadRequestError(`No review with is ${reviewId}`)
    }
    checkPermission(req.user, review.user)
    review.rating = rating
    review.title = title
    review.comment = comment

    await review.save()
    res.status(StatusCodes.OK).json({review})
}

const deleteReview = async (req, res) => {
    const reviewId = req.params.id
    const review = await Review.findOne({_id: reviewId})
    if (!review) {
        throw new CustomError.BadRequestError(`No review with is ${reviewId}`)
    }

    checkPermission(req.user, review.user)
    await review.remove()
    res.status(StatusCodes.OK).json({msg: "Success! Review removed"})
}

const getSingleProductReviews = async (req, res)=>{
    const {id: productId} = req.params
    const reviews = await Review.find({product: productId})
    res.status(StatusCodes.OK).json({reviews})
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
    getSingleProductReviews
}