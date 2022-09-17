import axios from 'axios';
import LobbyI from '../../interface/LobbyI';

/**
 * 
 * @param payload: name, author, image
 * @returns LobbyDocument
 */
const deleteLobbyApi_ = (payload: LobbyI, token:string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.delete(`/api/lobby/${payload.id}`, config)
}

export default deleteLobbyApi_


