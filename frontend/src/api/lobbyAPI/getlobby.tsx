import axios from 'axios';
import { ObjectId } from 'mongodb';

const getLobby = (token:string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.get('/api/lobby', config)
}

export default getLobby