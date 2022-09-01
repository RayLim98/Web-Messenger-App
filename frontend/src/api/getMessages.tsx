import axios from 'axios';

/**
 * @description Gets data user data if use if token is valid
 * @param token data user data if use if token is valid
 */
const getMessageApi = async (currentLobby: string, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.get(
        `/api/test/${currentLobby}`, 
        config, 
    )
}

export default getMessageApi

