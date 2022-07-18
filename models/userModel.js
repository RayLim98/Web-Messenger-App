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
    }, 
    {
        timestamps: true
    }
)


module.exports = mongoose.model('User', userSchema)