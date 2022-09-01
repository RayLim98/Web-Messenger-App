import React, { createContext, SetStateAction, useContext, useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client"
import asyncGetLobby from '../api/lobbyAPI/getlobby';
import { useAuth } from './authProvider';

const socket = io("http://localhost:3001", {
    autoConnect: false,
})

const CommContext = createContext<ContextProps>({
    sendMessage: () => {},
    joinLobby: () => {},
    createLobby: () => {},
    setLobby: () => {},
    isConnected: false,
    currentLobby: "",
    socket: socket,
});


const CommProvider = ({children}: CommProviderProps) => {
    const { user } = useAuth()
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [lobbyList, setLobbyList] = useState<string>("")
    const [currentLobby, setLobby] = useState<string>("")

    const sendMessage = () => {
        socket.emit("ping")
    }

    const joinLobby = () => {
        socket.emit("join_lobby", currentLobby)
    }

    const createLobby = () => {

    }

    useEffect(()=> {
        socket.on("connect", ()=> setIsConnected(true))
        socket.on("disconnect", ()=> setIsConnected(false))
    },[socket])

    useEffect(()=> {
        if(user) {
            const list = asyncGetLobby(user.token);
            console.log(list)
        }
    },[user])
    return (
        <CommContext.Provider 
            value = {{
               sendMessage, 
               joinLobby,
               createLobby,
               setLobby,
               isConnected,
               currentLobby,
               socket,
            }}>
            {children}
        </CommContext.Provider>
    )
}

const useComm = () => {
    const context = useContext(CommContext);
    if(!context) {
        throw new Error("useComm used outside of provider?")
    }
    return context
}

export { CommProvider, useComm }

interface CommProviderProps {
    children: React.ReactNode
}

interface ContextProps {
    sendMessage: () => void,
    joinLobby: () => void,
    createLobby: () => void,
    setLobby: (value: string) => void,
    isConnected: boolean,
    currentLobby: string,
    socket: Socket,
}

interface MessageProps {

}