const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// TODO set secret as a env variable and store it on a valt
const secret = "key" 

/**
 * @description authentication for Bearer tokens, on VALID JWT return user ID
 */
const authJWT = asyncHandler(async(req, res, next) => {
    let token
    //Check token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            console.log('Checking JWT token...')
            // Get and verify token
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, secret)

            // Get user through token and decalre new field user field
            // TODO: Take off password as an attribute
            req.user = await User.findById(decoded.id)
            next()
        } catch (err) {
            console.log(err)
            res.status(400).json({
                    message: 'Token is expired or invalid'
            })
            throw new Error('ERROR: Not Authorized'.red.underline)
        }
    }
    if(!token) {
        res.status(400)
        throw new Error('No token')
    }
})

module.exports = {
    authJWT
}