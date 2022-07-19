const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');

/**
 * @description GET 
 * @route /api/test 
 * @access private 
 */
const getMessage = asyncHandler(async (req, res) => {
    const messages = await Message.find({user: req.user.id})
    res.status(200).json(messages)
})

/**
 * @description POST 
 * @route /api/test 
 * @access private 
 */
const createMessage = asyncHandler(async (req, res) => {
    console.log(req.body.message)
    const message = await Message.create({
        message: req.body.message,
        user: req.user.id 
    })
    res.status(200).json(message)
})

/**
 * @description PUT
 */
const updateMessage = asyncHandler(async (req, res) => {
    console.log(`Update message with id: ${req.params.id}`.green)
    console.log(req.body)

    const message = await Message.findById(`${req.params.id}`)
    if(!message) {
        res.status(400);
        throw new Error('message id does not exist');
    }

    const updateMessage = await Message.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    )
    res.status(200).json(updateMessage)
})

/**
 * @description DELETE
 */
const deleteMessage = asyncHandler(async (req, res) => {
    console.log(`Delete message with id: ${req.params.id}`.red)
    const message = await Message.findById(`${req.params.id}`)
    if(!message) {
        res.status(400);
        throw new Error('message id does not exist')
    }
    await message.remove()
    res.status(200).json({
        message: `${req.params.id} has been deleted`
    })
})

module.exports = {
    getMessage,
    createMessage,
    updateMessage,
    deleteMessage
}