import React, { useState } from 'react'
import { AppBar, IconButton, Stack } from '@mui/material'
import { TextField, Button, Typography, Box } from '@mui/material'
import { Socket } from 'socket.io-client'
import MenuIcon from '@mui/icons-material/Menu';
import MainDrawer from '../drawer';
import MobileHeader from '../mobileHeader';

interface MessageBoxProps {
  socket: Socket
  lobbyId: string
  userName: string
}

/**
 * @description
 * Diplays messages and send messages
 */
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
    <Box sx={{
      height: "100%",
      display:"flex",
      flexDirection: "column",
    }}>
      <Stack flex={1} flexDirection="column-reverse">
        {/* Message List here */}
        <Typography color={"text.primary"} variant={"h6"}>
          hello
        </Typography>
      </Stack>
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
    </Box>
  )
}

export default MessageBox