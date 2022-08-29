const mongoose = require('mongoose')

const lobbySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name field']
    },
    image: {
        type: String,
    },
    }, 
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Lobby', lobbySchema)