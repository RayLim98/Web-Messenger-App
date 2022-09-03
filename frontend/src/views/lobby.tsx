import { useState, useEffect } from 'react'
import MobileChatView from '../components/composite/messageBox/mobileChatView'
import { useAuth } from '../context/authProvider';
import { useComm } from '../context/commProvider';
import MessageI from '../interface/MessageI';
import getMessageByLobbyId from '../api/getMessages';

const Lobby = () => {
  const { user } = useAuth();
  const { socket, sendMessage, currentLobby } = useComm();

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
    setMessageList((list) => {
      const updatedList = [payload, ...list]
      localStorage.setItem(`${currentLobby.id}`, JSON.stringify(updatedList))
      return updatedList
    })
    setMessage("")
  }

  const loadMessages = async ()=> {
    const cachedMessages = localStorage.getItem(`${currentLobby.id}`);
    if(cachedMessages) {
      setMessageList(JSON.parse(cachedMessages));
    }
    try {
      const messages = await getMessageByLobbyId(currentLobby, user.token)
      console.log(messages) 
      setMessageList(messages.data)
    } catch(e: any) {
      throw new Error("Failed to get message", e)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [user, currentLobby])

  useEffect(() => {
    socket.on("receive_message", (messageDoc: MessageI) => {
      setMessageList((list) => [messageDoc,...list])
    })

    return() => {
      socket.off("receive_message")
    }
  }, [socket])

  return (
      <MobileChatView 
          userName={user?.userName}
          messageList={messageList}
          inputValue={textValue}
          submitMessage={submitMessage}
          setInputValue={setMessage}
      /> 
  )
}

export default Lobby