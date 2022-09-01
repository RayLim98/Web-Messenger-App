import axios from 'axios';

interface Props {
    userName: string
    password: string
}

/**
 * @description logins user with credientials 
 * @returns 
 */
const loginUser = (payload: Props) => {
    const { userName, password } = payload;
    return axios.post('/api/user/login',{
        userName,
        password,
    })
}

export default loginUser

