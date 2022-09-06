import React from 'react'
import { Typography, Stack } from '@mui/material'
import MessageI from '../../../interface/MessageI'

interface Props { 
    messageList: MessageI[]
    userName: string
    height?: string
}
const MessageList = ({ messageList, userName, height }: Props) => {
  return (
    <Stack
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
  )
}

export default MessageList
