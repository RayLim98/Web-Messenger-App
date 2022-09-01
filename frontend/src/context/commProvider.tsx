import { ObjectId } from 'mongodb';
import React, { createContext, SetStateAction, useContext, useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client"
import { useAuth } from './authProvider';
import { useNavigate } from "react-router-dom"

const socket = io("http://localhost:3001")

const CommContext = createContext<ContextProps>({
    sendMessage: () => {},
    joinLobby: () => {},
    leaveLobby: () => {},
    createLobby: () => {},
    setLobby: () => {},
    ping: () => {},
    lobbyList: [],
    isConnected: false,
    currentLobby: "",
    socket: socket,
});


const CommProvider = ({children}: CommProviderProps) => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [lobbyList, setLobbyList] = useState<any>(null)
    const [currentLobby, setLobby] = useState<string>("")

    const sendMessage = async (messageDoc: MessageI) => {
      socket.emit("send_message", messageDoc)
    }

    const joinLobby = (lobbyId: string) => {
        setLobby(lobbyId);
        socket.emit("join_lobby", {
            lobbyId: lobbyId,
            user: user.userName
        })
    }

    const leaveLobby = () => {
        socket.emit("leave_lobby", {
            lobbyId: currentLobby,
            user: user.userName
        })
    }

    const createLobby = () => { }

    const ping = () => {
        socket.emit("ping")
    }

    useEffect(()=> {
        if(user) {
            const lobbyList = user.lobbies;
            console.log("User loaded in with lobbies ", lobbyList)
            setLobbyList(lobbyList)
        }
    },[user, lobbyList])

    return (
        <CommContext.Provider 
            value = {{
               sendMessage, 
               joinLobby,
               leaveLobby,
               createLobby,
               setLobby,
               ping,
               lobbyList,
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
    sendMessage: (messageDoc: MessageI) => void,
    joinLobby: (lobbyId: string) => void,
    leaveLobby: () => void,
    createLobby: () => void,
    ping: () => void,
    setLobby: (value: string) => void,
    lobbyList: ObjectId[],
    isConnected: boolean,
    currentLobby: string,
    socket: Socket,
}

export interface MessageI {
    lobbyId: string
    message: string
    author: string
}

export interface LobbyI {
    name: string
    author: string
    image?: string
}