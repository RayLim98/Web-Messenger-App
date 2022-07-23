import React, { createContext, useState, useEffect, useContext} from 'react'

const AuthContext = createContext<any>({})

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState(null);
    useEffect(() => {

    }, [user])
    
    const login = (email: string, password:string) => {

    }

    const register = (email: string, password:string) => {

    }

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
        throw new Error("useAuth() is called outside of a provider?")
    }
    return auth
}

export {AuthProvider, useAuth}