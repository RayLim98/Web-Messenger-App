import React from 'react'
import { Typography, Stack } from '@mui/material'
import MessageI from '../../../interface/MessageI'
import MuiChatBubble from '../../core/wrapper/muiChatBubble'

interface Props { 
    messageList: MessageI[]
    userName: string
    height?: string
}
const MessageList = ({ messageList, userName, height }: Props) => {
  return (
    <Stack
        sx={{
            height:'100%',
            mr: '1rem',
            ml: '1rem',
        }}
        direction={"column-reverse"}
        overflow={"scroll"}
    >
        {
            messageList.map((item: MessageI, idx: number)=> ( 
                <MuiChatBubble ownsMessage={userName === item.author}>
                    {item.message}
                </MuiChatBubble>
            ))
        }
    </Stack>
  )
}

export default MessageList
