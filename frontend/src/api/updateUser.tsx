import axios from 'axios';
import { ObjectId } from 'mongodb';
import LobbyI from '../interface/LobbyI';

interface Props {
    userName?: string
    image?: string
    lobbies?: LobbyI[]
}

const updateUserApi_ = async ({lobbies}: Props, token:string) => {
    const lobbyIds = lobbies?.map((lobby)=> lobby._id) 
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.put('/api/user/update', {
        lobbies: JSON.stringify(lobbyIds)
     }, config)
}

export default updateUserApi_
