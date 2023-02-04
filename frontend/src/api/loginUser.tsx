import api from './api';

interface Props {
    userName: string
    password: string
}

/**
 * @description logins user with credientials 
 * @returns 
 */
const loginUserApi = (payload: Props) => {
    const { userName, password } = payload;
    return api.post('/api/user/login',{
        userName,
        password,
    })
}

export default loginUserApi

