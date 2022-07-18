const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const authJWT = asyncHandler(async(req, res, next) => {
    let token
    //Check token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            console.log('Checking JWT token...')
            // Get and verify token
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user through token
            req.user = await User.findById(decoded.id)
            next()
        } catch (err) {
            console.log(err)
            res.status(400).json({
                    message: 'Token is expired or invalid'
            })
            throw new Error('Not Authorized')
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