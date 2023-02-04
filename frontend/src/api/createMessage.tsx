import MessageI from '../interface/MessageI';
import api from './api';

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

    return api.post(
        '/api/test/', 
        { ...message }
        , config
    )
}

export default createMessageApi
