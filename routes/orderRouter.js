const express = require('express')
const router = express.Router()
const {authorizePermissions} = require('../middleware/authentication')

const {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
} = require('../controllers/orderController')

router.get('/', authorizePermissions('admin'), getAllOrders)
router.get('/:id', getSingleOrder)
router.post('/', createOrder)
router.patch('/:id', updateOrder)

router.get('/showAllMyOrders', getCurrentUserOrders)

module.exports = router