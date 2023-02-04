const asyncHandler = require('express-async-handler')
const { Lobby } = require("../models/lobbyModel")

/**
 * @access PUBLIC
 */
const getLobbyById = asyncHandler(async(req,res) => {
    const { id } = req.params
    const lobbyDoc = await Lobby.findById(id);

    console.log(lobbyDoc)
    if(!lobbyDoc) {
        res.status(404).json({
            message: `Lobby ${id} not found`,
            data: id
        })
        throw new Error('Failed to find Lobby')
    } else {
        res.status(200).json({
            message: "Lobby found",
            data: lobbyDoc
        })
    }
})

/**
 * @access PRIVATE, BearerToken
 */
const createLobby = asyncHandler(async(req,res) => {
    // Payload
    const bodyData = req.body

    // Create lobby
    const newLobby = await Lobby.create({
        ...bodyData
    })
    
    // Check if success 
    if(newLobby) {
        console.log("New lobby created: ", newLobby._id)
        res.status(200).json(newLobby)
    } else {
        res.status(400).send({
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
    getLobby: getLobbyById,
    createLobby,
    deleteLobby
}
