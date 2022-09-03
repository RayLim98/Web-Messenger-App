import axios from 'axios';
import LobbyI from '../interface/LobbyI';

/**
 * @description Gets data user data if use if token is valid
 * @param token data user data if use if token is valid
 */
const getMessageByLobbyId = async (currentLobby: LobbyI, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    return axios.get(
        `/api/test/${currentLobby.id}`, 
        config, 
    )
}

export default getMessageByLobbyId
