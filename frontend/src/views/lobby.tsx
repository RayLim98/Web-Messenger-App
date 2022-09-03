import React, { useState, useEffect } from 'react'
import MobileChatView from '../components/composite/messageBox/mobileChatView'
import MobileHeader from '../components/composite/headers/mobileHeader';
import { useAuth } from '../context/authProvider';
import { useComm } from '../context/commProvider';
import MessageI from '../interface/MessageI';
import getMessageByLobbyId from '../api/getMessages';

const Lobby = () => {
  const { user } = useAuth();
  const { socket, sendMessage, currentLobby} = useComm();

  const [textValue, setMessage] = useState<string>("")
  const [messageList, setMessageList] = useState<MessageI[]>([])

  const submitMessage = () => {
    const payload: MessageI = {
      lobbyId: currentLobby.id.toString(), 
      message: textValue,
      author: user.userName,
      createdAt: new Date(Date.now())
    }
    // Send payload for socket and API handling
    sendMessage(payload)
    setMessageList((list) => [payload, ...list])
    setMessage("")
  }

  useEffect(() => {
    const loadMessages = async ()=> {
      try {
        const messages = await getMessageByLobbyId(currentLobby, user.token)
        console.log(messages) 
        setMessageList(messages.data)
      } catch(e: any) {
        throw new Error("Failed to get message", e)
      }
    }
    loadMessages()
  }, [currentLobby])

  useEffect(() => {
    socket.on("receive_message", (messageDoc) => {
      setMessageList((list) => [messageDoc,...list])
    })

    return() => {
      socket.off("receive_message")
    }
  }, [socket])
  return (
      <MobileChatView 
          lobby={currentLobby}
          userName={user?.userName}
          messageList={messageList}
          submitMessage={submitMessage}
          inputValue={textValue}
          setInputValue={setMessage}
      /> 
  )
}

export default Lobby