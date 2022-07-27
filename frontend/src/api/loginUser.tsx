import axios from 'axios';

interface Props {
    userName: string
    password: string
}

const loginUser = (payload: Props) => {
    const { userName, password } = payload;
    return axios.post('/api/user/login',{
        userName,
        password,
    })
}

export default loginUser

