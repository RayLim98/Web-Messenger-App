import { ObjectId } from "bson"

interface LobbyI {
    _id: ObjectId
    title: string
    author: string
    image?: string
}

export default LobbyI 
