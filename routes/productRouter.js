const express = require('express')
const router = express.Router()
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controllers/productController')

const {getSingleProductReviews} = require('../controllers/reviewController')

const {authorizePermissions} = require('../middleware/authentication')


router.post('/', authorizePermissions('admin'), createProduct)
router.get('/', getAllProducts)
router.get('/:id', getSingleProduct)
router.patch('/:id', authorizePermissions('admin'), updateProduct)
router.delete('/:id', authorizePermissions('admin'), deleteProduct)
router.post('/uploadImage', authorizePermissions('admin'), uploadImage)

router.get('/:id/reviews', getSingleProductReviews)

module.exports = router

