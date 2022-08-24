import React, { createContext, useState, useEffect, useContext} from 'react'
import getData from '../api/getUser';
import loginUser from '../api/loginUser';
import registerUser from '../api/registerUser';

const AuthContext = createContext<any>({})

interface UserInterface {
    _id: any
    userName: string
    token: string 
}

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    // user value is a JWT stringj
    const [user, setUser] = useState<UserInterface | null>(null);

    useEffect(() => {
        // Check if user has previously logged in
        const loggedInUser = localStorage.getItem('user')
        if(loggedInUser) {
            const userJson = JSON.parse(loggedInUser)
            setUser(userJson);
        }
    }, [])
    
    const login = async (payload:any) => {
        try {
            const { data } = await loginUser(payload);
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

    /**
     * @description takings in a user token. if verified user can access data 
     * @param token 
     */
    const getUserData = async (token: string) => {
        try {
            const res = await getData(token)
            console.log("Getting user data: ", res)
        } catch(err) {
            console.log("Could not get data", err)
        }
    }

    return (
        <AuthContext.Provider
            value={{user, login, register, setUser, getUserData}}
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