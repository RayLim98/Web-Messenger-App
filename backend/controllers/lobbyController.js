const asyncHandler = require('express-async-handler')
const Lobby = require("../models/lobbyModel")
const User = require("../models/userModel")

/**
 * @access PUBLIC
 */
const getLobby = asyncHandler(async(req,res) => {
    const { lobbyId } = req.body
    const lobbyDoc = await Lobby.findById(lobbyId);
    if(lobbyDoc) {
        res.status(200).json({
            message: "Lobby found",
            data: lobbyDoc
        })
    } else {
        res.status(400).json({
            message: "Couldn't find lobby",
            data: null
        })
    }
})


/**
 * @access PRIVATE, BearerToken
 */
const createLobby = asyncHandler(async(req,res) => {
    // Payload
    const {name, image} = req.body

    // From token
    const {userName} = req.user

    // Create lobby
    const newLobby = await Lobby.create({
        name: name,
        author: userName, 
        image: image
    })
    
    // Check if success 
    if(newLobby) {
        console.log("New lobby created: ", newLobby._id)
        res.status(200).json(newLobby)
    } else {
        res.status(400).json({
            message: "Failed to create lobby",
        })
    }

})

const deleteLobby = asyncHandler(async(req,res) => {
    const { id } = req.params;

    // Delete lobby 
    const deletedLobby = await Lobby.findByIdAndDelete(id);

    // Check of sucess
    if(deletedLobby) {
        console.log("Lobby deleted: ", deletedLobby)
        res.status(200).json({
            message: "Lobby sucessfully deleted.",
            data: deletedLobby
        })
    } else {
        res.status(400).json({
            message: "Failed to delete lobby.",
        })
    }
})

module.exports = {
    getLobby,
    createLobby,
    deleteLobby
}
