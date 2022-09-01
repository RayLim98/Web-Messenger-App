const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');

/**
 * @description GET 
 * @route /api/test 
 * @access private 
 */
const getMessageByName = asyncHandler(async (req, res) => {
    const id = req.params.name
    console.log("Fetcedh with params", id)
    const messages = await Message.find({lobbyId: id}).limit(30).lean().sort({createdAt: -1})
    if(!messages) {
        res.status(400).json(messages)
    }
    res.status(200).json(messages)
})

/**
 * @description POST 
 * @route /api/test 
 * @access private 
 */
const createMessage = asyncHandler(async (req, res) => {
    const { lobbyId, message, author} = req.body
    const newDoc = await Message.create({
        lobbyId, 
        message, 
        author,
    })

    if(!newDoc) { 
        res.status(400).json({ message: "failed store message"})
    }

    res.status(200).json(message)
})

/**
 * @description PUT
 */
const updateMessage = asyncHandler(async (req, res) => {
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
    getMessageByName,
    createMessage,
    updateMessage,
    deleteMessage
}