import axios from 'axios';

interface Props {
}

const updateUser = () => {
    return axios.put('/api/user/me')
}

export default updateUser
