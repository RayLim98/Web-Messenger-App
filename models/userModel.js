const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name field']
    },
    favoriteColor: {
        type: String,
        required: [true, 'Please add favoriteColor field']
    },
}, 
{
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)