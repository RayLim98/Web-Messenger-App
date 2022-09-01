import axios from 'axios';
import { ObjectId } from 'mongodb';

interface Props {
    name: string
    image?: string
}

/**
 * 
 * @param payload: name, author, image
 * @returns LobbyDocument
 */
const createLobby = (payload: Props, token:string) => {
    const { name, image } = payload;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.post('/api/lobby',{
        name,
        image,
    }, config)
}

export default createLobby


