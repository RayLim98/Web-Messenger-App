import axios from 'axios';
import { ObjectId } from 'mongodb';

interface Props {
    userName?: string
    image?: string
    lobbies?: ObjectId[]
}

const updateUserApi = ({lobbies}: Props, token:string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.put('/api/user/update', {
        lobbies: JSON.stringify(lobbies)
     }, config)
}

export default updateUserApi
