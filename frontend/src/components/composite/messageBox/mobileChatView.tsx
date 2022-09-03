import React, { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import { TextField, Button, Typography, Box } from '@mui/material'
import { useAuth } from '../../../context/authProvider'
import { useComm } from '../../../context/commProvider'
import MessageI from '../../../interface/MessageI'
import LobbyI from '../../../interface/LobbyI'

interface MessageBoxProps {
  lobby: LobbyI
  userName: string
  inputValue: string
  setInputValue: (value: string) => void
  messageList: MessageI[]
  submitMessage: () => void
}

/**
 * @description
 * Diplays messages and send messages
 */
const MobileChatView = ({
  submitMessage, 
  messageList, 
  inputValue,
  setInputValue, 
}: MessageBoxProps) => {
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
          messageList.map((item:any, idx: number)=> ( 
            <Typography variant='h6' key={idx}>
              {item.message}
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
          value={inputValue}
          onChange={(e)=> setInputValue(e.target.value)}
          sx={{
            flex: 1
          }}
        />
        <Button onClick={submitMessage}>
            <Typography>
              Send
            </Typography>
        </Button>
      </Stack>
    </Box>
  )
}

export default MobileChatView