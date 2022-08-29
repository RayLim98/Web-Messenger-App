import React, { useState } from 'react'
import { Stack } from '@mui/material'
import { TextField, Button, Typography } from '@mui/material'
import { Socket } from 'socket.io-client'

interface MessageBoxProps {
  socket: Socket
  lobbyId: string
  userName: string
}

const MessageBox = ({socket, lobbyId, userName}: MessageBoxProps) => {
  const [currentMessage, setCurrentMessage] = useState("")

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
    <Stack direction={'row'}>
      <TextField 
        value={currentMessage}
        onChange={(e)=> setCurrentMessage(e.target.value)}
      />
      <Button onClick={handleSubmit}>
          <Typography>
            Send
          </Typography>
      </Button>
    </Stack>
  )
}

export default MessageBox