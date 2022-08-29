import axios from 'axios';

/**
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
