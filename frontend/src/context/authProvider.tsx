import React, { createContext, useState, useEffect, useContext} from 'react'
import { ObjectId } from 'mongodb';
import getData from '../api/getUser';
import loginUser from '../api/loginUser';
import registerUser from '../api/registerUser';
import getMessageByLobbyId from '../api/getMessages';
import { AxiosResponse } from 'axios';
import { LocalSeeOutlined } from '@mui/icons-material';

const AuthContext = createContext<any>({})

interface UserInterface {
    _id: ObjectId
    userName: string
    age: number
    token: string
    lobbies: ObjectId[]
}

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    // user value is a JWT string
    const [user, setUser] = useState<UserInterface | null>(null);

    useEffect(() => {
        // Check if user has previously logged in
        const loggedInUser = localStorage.getItem("user")
        console.log(loggedInUser)
        if(loggedInUser) {
            const userJson = JSON.parse(loggedInUser)
            setUser(userJson);
        }
    }, [])
    
    const login = async (payload:any) => {
        try {
            // Save user 
            const {data} = await loginUser(payload);
            setUser(data);

            // Store data as a string to avoid VAUGE object output
            localStorage.setItem('user', JSON.stringify(data));
            console.log('Login sucessful: ', data);
        } catch(err) {
            console.log('Login ussucessful: ', err);
        }
    }

    const register = (data:any) => registerUser(data)
        .then(res => {
            console.log("Sucess", res.data);
        })
        .catch(err => {
            console.log("Error",err);
        })

    const logout = () => {
        localStorage.clear();
        setUser(null);
    }

    /**
     * @description takings in a user token. if verified user can access data 
     * @param token 
     */
    const getUserData = async () => {
        if(user)
            try {
                const res = await getData(user.token)
                console.log("Getting user data: ", res)
                return res.data
            } catch(err) {
                console.log("Could not get data", err)
                return err
            }
    }

    return (
        <AuthContext.Provider
            value={{
                user, 
                login, 
                register, 
                setUser, 
                getUserData,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const auth = useContext(AuthContext);
    if(auth == null) {
        throw new Error("useAuth() is called outside of a provider?");
    }
    return auth
}

export {AuthProvider, useAuth}