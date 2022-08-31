const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        lobbyId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please add a text field'],
        },
        message: {
            type: String,
            required: [true, 'Please add a text field'],
        },
        userName: {
            type: String,
            required: [true, 'Please add a text field'],
        },
    },
    {
        timestamps: true,
    }
) 

module.exports = mongoose.model('Message', messageSchema);