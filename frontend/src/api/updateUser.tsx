import axios from 'axios';

interface Props {
}

const updateUser = () => {
    return axios.get('/api/user/me')
}

export default updateUser
