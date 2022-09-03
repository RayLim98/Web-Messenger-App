import { ObjectId } from "mongodb";

interface MessageI {
    lobbyId: string
    message: string 
    author: string
    createdAt: Date
}

export default MessageI
