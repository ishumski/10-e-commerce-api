const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authUser = async (req, res, next) => {
    //get token from cookies
    const token = req.signedCookies.token
    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }

    try {
        const {name, role, userId} = isTokenValid({token})
        req.user = {name, role, userId}
        next()
    } catch (e) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role
        if (!roles.includes(userRole)) {
            throw new CustomError.UnauthorizedError('Unauthorized to access this route')
        }
        next()
    }
}

module.exports = {
    authUser,
    authorizePermissions
}