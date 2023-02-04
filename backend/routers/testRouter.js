const express = require('express');
const router = express.Router();
const {
    getMessageByLobbyId,
    createMessage,
    updateMessage,
    deleteMessage
} = require('../controllers/testController')
const { authJWT } = require('../middlware/authMiddleware')

router.get('/:lobbyId', authJWT , getMessageByLobbyId)
router.post('/', authJWT, createMessage)
router.put('/:id', updateMessage)
router.delete('/:id', deleteMessage)

module.exports = router;
