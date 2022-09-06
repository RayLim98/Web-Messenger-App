import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import { Container, useMediaQuery, useTheme } from '@mui/material'
import MobileChatView from '../components/composite/messageBox/mobileChatView'
import DesktopChatView from '../components/composite/messageBox/desktopChatView'
// Hooks
import { useAuth } from '../context/authProvider'
import { useComm } from '../context/commProvider'
// API
import getMessageByLobbyId from '../api/getMessages'
// Interfaces
import MessageI from '../interface/MessageI'

const Home = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuth();
  const { socket, sendMessage, currentLobby, lobbyList } = useComm();

  // States
  const [textValue, setMessage] = useState<string>("")
  const [messageList, setMessageList] = useState<MessageI[]>([])

  // Navigate back to load screen if user becomes null
  useEffect(()=> {
    if(!user) navigate("/")
    else loadMessages()
  }, [user, currentLobby])

  // Listen to incoming messages
  useEffect(() => {
    socket.on("receive_message", (messageDoc: MessageI) => {
      setMessageList((list) => [messageDoc,...list])
    })

    return() => {
      socket.off("receive_message")
    }
  }, [socket])

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


  return (
    <Container 
      sx={{ 
        backgroundColor: "background.default",
        borderRadius: {
          xs: "25px",
          sm: "unset",
        }
      }}
    >
      { 
        isMobile
        ? <MobileChatView 
            lobbyTitle={currentLobby.title}
            userName={user?.userName}
            messageList={messageList}
            inputValue={textValue}
            submitMessage={submitMessage}
            setInputValue={setMessage}
          /> 
        : <DesktopChatView
            lobbyTitle={currentLobby.title}
            lobbyList={lobbyList}
            userName={user?.userName}
            messageList={messageList}
            inputValue={textValue}
            submitMessage={submitMessage}
            setInputValue={setMessage}
          />
      }
    </Container>
  )
}

export default Home
