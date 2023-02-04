import axios from 'axios';
import LobbyI from '../../interface/LobbyI';
import api from '../api';

/**
 * 
 * @param payload: name, author, image
 * @returns LobbyDocument
 */
const createLobbyApi_ = (payload: LobbyI, token:string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return api.post('/api/lobby', payload, config)
}

export default createLobbyApi_


