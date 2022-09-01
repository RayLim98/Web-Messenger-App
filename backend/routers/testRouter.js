const express = require('express');
const router = express.Router();
const {
    getMessageByName,
    createMessage,
    updateMessage,
    deleteMessage
} = require('../controllers/testController')
const { authJWT } = require('../middlware/authMiddleware')

router.get('/:name', authJWT , getMessageByName)
router.post('/', authJWT, createMessage)
router.put('/:id', updateMessage)
router.delete('/:id', deleteMessage)

module.exports = router;
