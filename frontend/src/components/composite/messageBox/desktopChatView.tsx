import React from 'react'
import { Box, Stack, Toolbar, Typography, CssBaseline, AppBarProps, styled, Button } from '@mui/material'
import MessageI from '../../../interface/MessageI'
import MuiPrimTextField from '../../core/inputfields-mui/muiPrimTextField'
import MuiPrimButton from '../../core/buttons-mui/muiPrimButton'
import MessageList from './chat'
import LobbyI from '../../../interface/LobbyI'
import { useComm } from '../../../context/commProvider'
import UserBanner from '../banner/userBanner'

interface DesktopChatViewProps {
  lobbyTitle: string
  lobbyList: LobbyI[]
  userName: string
  inputValue: string
  messageList: MessageI[]
  setInputValue: (value: string) => void
  submitMessage: () => void
}

const DesktopChatView = ({
  lobbyTitle,
  lobbyList,
  userName, 
  inputValue, 
  messageList, 
  setInputValue, 
  submitMessage
}: DesktopChatViewProps) => {
  const { joinLobby } = useComm()
  const onSelect = (selection: LobbyI)=> joinLobby(selection)
  return (
    <Box 
      display={"flex"}
      height={"100%"}
    >
      <Stack 
        flex={1}
        alignItems={"stretch"}
        sx={{
          borderRight: "1px solid grey",
        }}
      >
        <Stack alignSelf={"center"}>
          <UserBanner userImage={null} size={10}/>
        </Stack >
        <Stack alignItems={"stretch"}>
          <Button>
              <Typography color={"secondary"}>
                add server
              </Typography>
          </Button>
          {
            lobbyList.map((item,idx)=> (
              <Button onClick={()=> onSelect(item)} key={idx}>
                <Typography color={"secondary"}>
                  {item.title}
                </Typography>
              </Button>
            ))
          }
        </Stack>
      </Stack>
      <Stack flex={3} justifyContent={"flex-end"}>
        <MessageList messageList={messageList} userName={userName}/>
        <Stack direction={"row"}>
          <MuiPrimTextField
            onChange={(e)=> setInputValue(e.target.value)}
            value={inputValue}
          />
          <MuiPrimButton onClick={submitMessage}>
            Send
          </MuiPrimButton>
        </Stack>
      </Stack>
    </Box>
  )
}

export default DesktopChatView