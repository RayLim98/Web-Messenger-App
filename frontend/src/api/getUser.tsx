import api from './api';

/**
 * @param {string} token JWT token for authentication
 * @description Gets data user data if use if token is valid
 */
const getUserDataApi = (token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return api.get(
        '/api/user/',
        config
    )
}

export default getUserDataApi
