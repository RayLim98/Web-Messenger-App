const express = require('express')
const router = express.Router();
const {
    getLobby,
    createLobby,
    deleteLobby
} = require('../controllers/lobbyController');
const { authJWT } = require('../middlware/authMiddleware')

router.get('/', getLobby)
router.post('/', authJWT, createLobby);
router.delete('/:id', deleteLobby)

module.exports = router
