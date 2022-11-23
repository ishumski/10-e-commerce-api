const {
    createJWT,
    isTokenValid,
    attachCookiesToResponse
} = require('./jwt')
const createTokenUser = require('./createTokenUser')
const checkPermission = require('./checkPermissions')

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser,
    checkPermission
}
