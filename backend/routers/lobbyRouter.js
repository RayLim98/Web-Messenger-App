const express = require('express')
const router = express.Router();
const {
    getLobby,
    createLobby,
    deleteLobby
} = require('../controllers/lobbyController');

router.get('/', getLobby)
router.post('/', createLobby);
router.delete('/:id', deleteLobby)

module.exports = router

