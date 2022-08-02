import React, { createContext, useState, useEffect, useContext} from 'react'
import loginUser from '../api/loginUser';
import registerUser from '../api/registerUser';

const AuthContext = createContext<any>({})

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        // Check if user has previously logged in
        const loggedInUser = localStorage.getItem('user');
        if(loggedInUser) {
            setUser(loggedInUser);
        }
    }, [])
    
    // const login = (data:any) => loginUser(data)
    //     .then(res => {
    //         setUser(res.data);
    //         localStorage.setItem('user', res.data);
    //         console.log('Login sucessful: ', res);
    //     })
    //     .catch(err => {
    //         console.log('Login Failed: ', err);
    //     })

    const login = async (data:any) => {
        try {
            const res = await loginUser(data);
            setUser(res.data);
            localStorage.setItem('user', res.data);
            console.log('Login sucessful: ', res);
        } catch(err) {
            console.log('Login ussucessful: ', err);
        }
    }

    const register = (data:any) => registerUser(data)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })

    return (
        <AuthContext.Provider
            value={{user, login, register, setUser}}
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