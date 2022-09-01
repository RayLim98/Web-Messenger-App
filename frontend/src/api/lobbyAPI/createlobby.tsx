import axios from 'axios';
import { ObjectId } from 'mongodb';

interface Props {
    name: string
    author: ObjectId
    image?: string
}

/**
 * 
 * @param payload: name, author, image
 * @returns 
 */
const createLobby = (payload: Props) => {
    const { name, author, image } = payload;
    return axios.post('/api/lobby',{
        name,
        author,
        image,
    })
}

export default createLobby


