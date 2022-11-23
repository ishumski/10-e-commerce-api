const express = require('express')
const router = express()
const {
    getAllUsers,
    updateUser,
    getSingleUser,
    showCurrentUser,
    updateUserPassword
} = require("../controllers/userContoller");
const {authUser, authorizePermissions} = require('../middleware/authentication')

router.route('/').get(authUser, authorizePermissions('admin'), getAllUsers)
router.route('/showMe').get(authUser, showCurrentUser)
router.route('/updateUser').patch(authUser, updateUser)
router.route('/updateUserPassword').patch(authUser, updateUserPassword)
router.route('/:id').get(authUser, getSingleUser)

module.exports = router