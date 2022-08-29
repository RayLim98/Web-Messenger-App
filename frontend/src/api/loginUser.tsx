import axios from 'axios';

interface Props {
    userName: string
    password: string
}

/**
 * @description logins user with credientials 
 * @param payload {password, username} 
 * @success returns JSON { _id, userName, age, token}
 * @failure return JSON { message }
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

