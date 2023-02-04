import axios from 'axios';
import MessageI from '../interface/MessageI';

/**
 * @description Gets data user data if use if token is valid
 * @param token data user data if use if token is valid
 * @param payload message to be created
 */
const createMessageApi = (payload: MessageI, token: string ) => {
    const message = payload;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    return axios.post(
        '/api/test/', 
        { ...message }
        , config
    )
}

export default createMessageApi
