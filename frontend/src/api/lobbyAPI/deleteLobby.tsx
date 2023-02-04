import axios from 'axios';
import LobbyI from '../../interface/LobbyI';
import api from '../api';

/**
 * 
 * @param payload: name, author, image
 * @returns LobbyDocument
 */
const deleteLobbyApi_ = (payload: LobbyI, token:string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return api.delete(`/api/lobby/${payload._id}`, config)
}

export default deleteLobbyApi_


