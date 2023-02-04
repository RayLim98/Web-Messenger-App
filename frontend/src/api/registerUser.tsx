import axios from 'axios';
import api from './api';

interface Props {
    userName: string
    password: string
    age: number
}

/**
 * @description creates new user document 
 * @returns 
 */
const registerUserApi = (payload: Props) => {
    const { userName, password, age } = payload;
    return api.post('/api/user/register',{
        userName,
        password,
        age,
    })
}

export default registerUserApi
