const express = require('express')
const router = express.Router()

const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController')

router.post('/', createReview)
router.get('/', getAllReviews)
router.get('/:id', getSingleReview)
router.patch('/:id', updateReview)
router.delete('/:id', deleteReview)

module.exports = router