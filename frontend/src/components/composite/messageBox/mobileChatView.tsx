import React, { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import { TextField, Button, Typography, Box } from '@mui/material'
import { Socket } from 'socket.io-client'
import { ObjectId } from 'mongodb'
import { useComm, MessageI} from '../../../context/commProvider'
import createMessage from '../../../api/createMessage'
import { useAuth } from '../../../context/authProvider'

interface MessageBoxProps {
  lobbyId: string
  userName: string
}

/**
 * @description
 * Diplays messages and send messages
 */
const MobileChatView = ({lobbyId, userName}: MessageBoxProps) => {
  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState<string[]>(["hello"])
  const { user } = useAuth()
  const { sendMessage, socket } = useComm()

  const handleSubmit = async () => {
    try {
      const payload = {
        lobbyId: lobbyId,
        message: currentMessage,
        author: userName
      }
      const res = await createMessage(payload, user.token)
      if(res) {
        sendMessage({ ...payload })
      }
    } catch(e) {

    }
    setMessageList(list => [currentMessage, ...list])
    setCurrentMessage("")
  }

  useEffect(() => {
    socket.on("receive_message", (messageDoc) => {
      setMessageList(list => [messageDoc.message,...list])
    })

    return() => {
      socket.off("receive_message")
    }
  }, [socket])
  
  return (
    <Box sx={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      <Stack 
        flex={1}
        direction={"column-reverse"}
        overflow={"scroll"}
      >
        {
          messageList.map((item, idx)=> ( 
            <Typography variant='h6' key={idx}>
              {item}
            </Typography>
          ))
        }
      </Stack>
      <Stack 
          direction={'row'} 
          justifyContent={"center"}
          sx={{
            marginBottom: "1rem"
          }}
        >
        <TextField 
          value={currentMessage}
          onChange={(e)=> setCurrentMessage(e.target.value)}
          sx={{
            flex: 1
          }}
        />
        <Button onClick={handleSubmit}>
            <Typography>
              Send
            </Typography>
        </Button>
      </Stack>
    </Box>
  )
}

export default MobileChatView