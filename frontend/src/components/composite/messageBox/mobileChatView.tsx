import React, { useState } from 'react'
import { Stack } from '@mui/material'
import { TextField, Button, Typography, Box } from '@mui/material'
import { Socket } from 'socket.io-client'

interface MessageBoxProps {
  socket: Socket
  lobbyId: string
  userName: string
  // setMessage: (value:string) => void
}

/**
 * @description
 * Diplays messages and send messages
 */
const MobileChatView = ({socket, lobbyId, userName}: MessageBoxProps) => {
  const [currentMessage, setCurrentMessage] = useState("")
  const [listMessage, setMessageList] = useState("")

  const handleSubmit = () => {
    if(currentMessage !== "" && lobbyId !== "") 
      socket.emit("client_message", {
        message: currentMessage,
        userName,
        lobbyId,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      })
  }
  
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
        <Typography>
          hello
        </Typography>
        <Typography>
          hello
        </Typography>
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