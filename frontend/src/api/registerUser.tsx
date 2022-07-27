import axios from 'axios';

interface Props {
    userName: string
    password: string
    age: number
}

const registerUser = (payload: Props) => {
    const { userName, password, age } = payload;
    return axios.post('/api/user/register',{
        userName,
        password,
        age,
    })
}

export default registerUser
