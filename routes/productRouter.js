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


router.post('/', createProduct)
router.get('/', getAllProducts)
router.get('/:id', getSingleProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.post('/upload', uploadImage)

module.exports = router

