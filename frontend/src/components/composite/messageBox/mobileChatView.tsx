import React, { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import { TextField, Button, Typography, Box } from '@mui/material'
import { useAuth } from '../../../context/authProvider'
import { useComm } from '../../../context/commProvider'
import MessageI from '../../../interface/MessageI'
import LobbyI from '../../../interface/LobbyI'

interface MobileChatViewProps {
  userName: string
  inputValue: string
  messageList: MessageI[]
  setInputValue: (value: string) => void
  submitMessage: () => void
}

/**
 * @description
 * Diplays messages and send messages
 */
const MobileChatView = ({
  userName,
  inputValue,
  messageList, 
  setInputValue, 
  submitMessage, 
}: MobileChatViewProps) => {
  const { user } = useAuth()
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
          messageList.map((item: MessageI, idx: number)=> ( 
            <Typography variant='h6' key={idx} color={"text.primary"} 
              sx={{
                alignSelf: userName && userName === item.author? "flex-end": "flex-start",
              }}
            >
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
            <Typography color={"text.secondary"}>
              Send
            </Typography>
        </Button>
      </Stack>
    </Box>
  )
}

export default MobileChatView