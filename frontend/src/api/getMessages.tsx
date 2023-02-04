import LobbyI from '../interface/LobbyI';
import api from './api';

/**
 * @description Gets data user data if use if token is valid
 * @param token data user data if use if token is valid
 */
const getMessageByLobbyId = async (currentLobby: LobbyI, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    return api.get(
        `/api/test/${currentLobby._id}`, 
        config, 
    )
}

export default getMessageByLobbyId
