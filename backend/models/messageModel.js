const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        lobbyId: {
            type: String,
            required: [true, 'Please add a text field'],
        },
        message: {
            type: String,
            required: [true, 'Please add a text field'],
        },
        author: {
            type: String,
            required: [true, 'Please add a text field'],
        },
    },
    {
        timestamps: true,
    }
) 

module.exports = mongoose.model('Message', messageSchema);