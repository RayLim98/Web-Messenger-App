const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please add name field']
    },
    password: {
        type: String,
        required: [true, 'Please add password field']
    },
    image: {
        type: String,
    },
    age: {
        type: String,
        required: [true, 'Please add number']
    },
    lobbies: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)
