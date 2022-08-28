import axios from 'axios';

/**
 * @description Gets data user data if use if token is valid
 * @param token data user data if use if token is valid
 * @param payload message to be created
 */
const createMessage = (payload: string, token: string ) => {
    const message = payload;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.post(
        '/api/test/', 
        {
            message,
        },
        config, 
    )
}

export default createMessage
