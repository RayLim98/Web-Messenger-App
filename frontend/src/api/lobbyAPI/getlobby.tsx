import { ObjectId } from 'bson';
import api from '../api';

const getLobbyByIdApi = (lobbyId: ObjectId,token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return api.get(`/api/lobby/${lobbyId.toString()}`, config)
}

export default getLobbyByIdApi
