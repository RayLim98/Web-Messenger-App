import React from 'react'
import {Box} from '@mui/material'
import {Socket} from 'socket.io-client'

interface DesktopChatViewProps {
  socket: Socket
  lobbyId: string
  userName: string
//   setMessage: (value:string) => void
}

const DesktopChatView = ({socket, lobbyId, userName}: DesktopChatViewProps) => {
  return (
    <Box>

    </Box>
  )
}

export default DesktopChatView