import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client"
import { useAuth } from './authProvider';
import { useNavigate } from "react-router-dom"

import LobbyI from '../interface/LobbyI';
import MessageI from '../interface/MessageI';
import createMessageApi from '../api/createMessage';
import createLobbyApi_ from '../api/lobbyAPI/createlobby';
import updateUserApi_ from '../api/updateUser';
import { ObjectId, ObjectID } from 'bson';
import getLobbyByIdApi from '../api/lobbyAPI/getlobby';
import deleteLobbyApi_ from '../api/lobbyAPI/deleteLobby';

const socket = io("http://localhost:3001")

const CommContext = createContext<ContextProps>({
    sendMessage: () => {},
    joinLobby: () => {},
    createLobby: () => {},
    deleteLobby: () => {},
    setLobbyList: ()=> {},
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
    const { user, setUser } = useAuth()
    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [lobbyList, setLobbyList] = useState<LobbyI[]>(lobbies)
    const [currentLobby, setLobby] = useState<LobbyI>({} as LobbyI)

    const sendMessage = async (messageDoc: MessageI) => {
        try {
            const res = await createMessageApi(messageDoc, user!.token)
            console.log("Sent message with response: ", res)
            socket.emit("send_message", messageDoc)
        } catch(e) {
            console.log("failed to send message: ", e)
        }
    }

    const loadLobbies = async () => {
        const lobbyIds = user.lobbies
        console.log("Load Lobbies", lobbyIds)

        // Grab all lobbies with current users list
        const lobbyData = await Promise.all(
            lobbyIds.map(async(lobbyId: ObjectId)=> {
                try {
                    const response = await getLobbyByIdApi(lobbyId, user.token)
                    return response
                } catch(e: any) {
                    return e.response
                }
            })
        )

        // Filter the successful responses and get the data
        const newLobbiesList = lobbyData
        .filter((res)=> res.status === 200)
        .map((res)=> res.data.data)

        // Set Lobbies
        console.trace('Fetched Lobbies', newLobbiesList)
        setLobbyList(lobbies.concat(newLobbiesList))
    }

    const joinLobby = async (lobby: LobbyI) => {
        leaveLobby()
        setLobby(lobby);
        socket.emit("join_lobby", {
            lobbyId: lobby._id,
            user: user.userName
        })
    }

    const leaveLobby = async () => {
        socket.emit("leave_lobby", {
            lobbyId: currentLobby._id,
            user: user.userName
        })
    }

    const createLobby = async (newLobby: LobbyI) => { 
        try {
            const res = await createLobbyApi_(newLobby, user.token)
            if(res) {
                // New Lobby list 
                const newLobbyObjectIds = [...user.lobbies, res.data._id]
                // Update user lobbies field
                const updateUser = {...user, lobbies: newLobbyObjectIds}

                // Set updated user details on client and cache it
                // Store data as a string to avoid VAUGE object output
                setUser(updateUser)
                localStorage.setItem("user", JSON.stringify(updateUser))

                // Update user details in the database
                const prevDoc = await updateUserApi_({ 
                    lobbies: newLobbyObjectIds 
                }, user.token)

            console.log("Updated user document: ", prevDoc)
            }
        } catch(e) {
            console.log("Failed to create lobby", e)
        }
    }

    const deleteLobby = async (deleteLobby: LobbyI) => {
        try {
            const res = await deleteLobbyApi_(deleteLobby, user.token)
            if(res) {
                
                console.log('Lobby has been deleted', res)
            }
        } catch (e) {
                console.log('Failed to delete lobby', e)
        }
    }

    const ping = () => {
        socket.emit("ping")
    }

    /**
     * Reload when user adds a new lobby
     */
    useEffect(() => {
        loadLobbies()
    }, [user.lobbies])
    
    return (
        <CommContext.Provider 
            value = {{
               sendMessage, 
               joinLobby,
               createLobby,
               deleteLobby,
               setLobby,
               ping,
               setLobbyList,
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
    createLobby: (lobby: LobbyI) => void,
    deleteLobby: (lobby: LobbyI) => void,
    ping: () => void,
    setLobby: React.Dispatch<React.SetStateAction<LobbyI>>,
    setLobbyList: React.Dispatch<React.SetStateAction<LobbyI[]>>,
    isConnected: boolean,
    lobbyList: LobbyI[],
    currentLobby: LobbyI,
    socket: Socket,
}


const lobbies: LobbyI[]= [
  {
    _id: new ObjectID("6312cee1322f306b8f1d1720"),
    title: "MyChat",
    author: "raymodnlim",
    image: ""
  },
]