const mongoose = require('mongoose')

const lobbySchema = mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
        required: [true, 'Please add name field']
    },
    author: {
        type: String,
        required: [true, 'Please add creater field'],
    },
    image: {
        type: String,
    },
    }, 
    {
        timestamps: true
    }
)

const Lobby = mongoose.model('Lobby', lobbySchema) 

module.exports = {
    lobbySchema,
    Lobby
} 