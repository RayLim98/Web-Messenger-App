const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        message: {
            type: String,
            required: [true, 'Please add a text field'],
        },
    },
    {
        timestamps: true,
    }
) 

module.exports = mongoose.model('Message', messageSchema);