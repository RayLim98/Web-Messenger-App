import { ObjectId } from 'mongodb';
import React, { createContext, SetStateAction, useContext, useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client"
import { useAuth } from './authProvider';
import { useNavigate } from "react-router-dom"
import LobbyI from '../interface/LobbyI';
import MessageI from '../interface/MessageI';
import createMessage from '../api/createMessage';

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
    currentLobby: {} as LobbyI,
    socket: socket,
});

/**
 * @description Socket and database state handler. Abstration of message logic for socket and api/database layer 
 * @returns 
 */
const CommProvider = ({children}: CommProviderProps) => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [lobbyList, setLobbyList] = useState<LobbyI[]>([])
    const [currentLobby, setLobby] = useState<LobbyI>({} as LobbyI)

    const sendMessage = async (messageDoc: MessageI) => {
        try {
            const res = await createMessage(messageDoc, user.token)
            console.log("Sent message with response: ", res)
            socket.emit("send_message", messageDoc)
        } catch(e) {
            console.log("failed to send message: ", e)
        }
    }

    const joinLobby = (lobby: LobbyI) => {
        leaveLobby()
        setLobby(lobby);
        socket.emit("join_lobby", {
            lobbyId: lobby.id,
            user: user.userName
        })
        navigate(`/home/${lobby.title}`)
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
    joinLobby: (lobby: LobbyI) => void,
    leaveLobby: () => void,
    createLobby: () => void,
    ping: () => void,
    setLobby: (lobby: LobbyI) => void,
    isConnected: boolean,
    lobbyList: LobbyI[],
    currentLobby: LobbyI,
    socket: Socket,
}
