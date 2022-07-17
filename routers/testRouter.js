const express = require('express');
const router = express.Router();
const {
    getMessage,
    createMessage,
    updateMessage,
    deleteMessage
} = require('../controllers/testController')

router.get('/', getMessage)
router.post('/', createMessage)
router.put('/:id', updateMessage)
router.delete('/:id', deleteMessage)

module.exports = router;
