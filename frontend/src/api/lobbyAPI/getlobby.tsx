import axios from 'axios';
import { ObjectId } from 'bson';

const getLobbyByIdApi = (lobbyId: ObjectId,token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.get(`/api/lobby/${lobbyId.toString()}`, config)
}

export default getLobbyByIdApi
