const {StatusCodes} = require('http-status-codes')
const User = require('../models/User')
const CustomError = require("../errors")
const {attachCookiesToResponse, createTokenUser} = require("../utils");
require('dotenv').config()

const register = async (req, res) => {
    const {email, name, password} = req.body
    const emailExists = await User.findOne({email})
    if (emailExists) {
        throw new CustomError.BadRequestError('Email already exists')
    }

    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'
    const user = await User.create({email, name, password, role})

    const userPayload = createTokenUser(user)

    attachCookiesToResponse({res, userPayload})
    res.status(StatusCodes.OK).json({user: userPayload})
}
const login = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please, provide email and password')
    }

    const user = await User.findOne({email})
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    const userPayload = createTokenUser(user)
    attachCookiesToResponse({res, userPayload})
    res.status(StatusCodes.OK).json({user: userPayload})
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 1000)
    })
    res.status(StatusCodes.OK).json({msg: 'User logged out'})
}

module.exports = {
    register,
    login,
    logout
}