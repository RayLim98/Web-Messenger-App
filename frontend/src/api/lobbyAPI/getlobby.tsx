import axios from 'axios';

const asyncGetLobby = async (token:string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.get('/api/lobby', config)
}

export default asyncGetLobby
