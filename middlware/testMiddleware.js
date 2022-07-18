const asyncHandler = require('express-async-handler')

const testMiddleware = (req, res, next) => {
    console.log('test 1')
    req.num = 1;
    req.test1 = 'first middleware has run'
    next()
}

const testMiddleware2 = (req, res, next) => {
    console.log('test 2')
    req.num = req.num + 2;
    req.test2 = 'second middleware has run'
    next()
}

module.exports = {
    testMiddleware,
    testMiddleware2,
}