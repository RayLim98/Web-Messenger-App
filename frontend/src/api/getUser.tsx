import axios from 'axios';

/**
 * @param {string} token JWT token for authentication
 * @description Gets data user data if use if token is valid
 */
const getData = (token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.get(
        '/api/user/',
        config
    )
}

export default getData
