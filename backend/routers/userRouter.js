const express = require('express')
const router = express.Router()
const { 
    registerUser, 
    loginUser,
    getUser
} = require('../controllers/userController')

// Middleware
const { testMiddleware, testMiddleware2 } = require('../middlware/testMiddleware')
const { authJWT } = require('../middlware/authMiddleware')

router.get('/me', authJWT, getUser)
router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/flowtest', testMiddleware, testMiddleware2, async (req, res)=> {
    console.log('test 3 end point has been reached', req.test1, req.test2)
    console.log(req.num);
    res.status(200).send('test endpoint has been reached')
})

module.exports = router
