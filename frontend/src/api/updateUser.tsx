import axios from 'axios';
import { ObjectId } from 'mongodb';

interface Props {
    userName?: string
    image?: string
    lobbyId?: ObjectId
}

const updateUserApi = ({lobbyId}: Props, token:string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.put('/api/user/update', {
        lobbyId: lobbyId
     }, config)
}

export default updateUserApi
