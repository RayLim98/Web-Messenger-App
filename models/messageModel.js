const mongoose = require('mongoose');
const User = require('../models/userModel')

const messageSchema = mongoose.Schema(
    {
        message: {
            type: String,
            required: [true, 'Please add a text field'],
        },
        user: {
            // type: mongoose.Schema.Types.ObjectId,
            // required: [true, 'Please add a text field'],
            // ref: 'User'
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please add a text field'],
        },
    },
    {
        timestamps: true,
    }
) 

module.exports = mongoose.model('Message', messageSchema);