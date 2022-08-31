const asyncHandler = require('express-async-handler')
const Lobby = require("../models/lobbyModel")

const getLobby = asyncHandler(async(req,res) => {
    const { creatorId } = req.body
    const lobbyDoc = await Lobby.find({creatorId: creatorId});
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

const createLobby = asyncHandler(async(req,res) => {
    const {name, creatorId, image} = req.body
    const newLobby = await Lobby.create({
        name: name,
        creatorId: creatorId, 
        image: image
    })

    if(newLobby) {
        console.log("New lobby created: ", newLobby._id)
        res.status(200).json({
            message: "New lobby sucessfully created.",
            data: newLobby
        })
    } else {
        res.status(400).json({
            message: "Failed to create lobby",
        })
    }
})

const deleteLobby = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const deletedLobby = await Lobby.findByIdAndDelete(id);
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
