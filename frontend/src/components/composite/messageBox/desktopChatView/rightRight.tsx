import React from 'react'
import { Stack } from '@mui/material'
import MessageList from '../chat'
import MuiPrimTextField from '../../../core/inputfields-mui/muiPrimTextField'
import MuiPrimButton from '../../../core/buttons-mui/muiPrimButton'
import MessageI from '../../../../interface/MessageI'
import MobileHeader from '../../headers/mobileHeader'

interface Props {
  messageList: MessageI[]
  value: string
  onSubmit: ()=> void
  userName: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> void
}
const RightView = ({
  messageList,
  value,
  userName,
  onSubmit,
  onChange,
}: Props) => {
  return (
    <Stack flex={3} justifyContent={"flex-end"}>
      <MobileHeader lobbyTitle='' disableDrawer={true} relative/>
      <MessageList messageList={messageList} userName={userName}/>
      <Stack direction={"row"}>
        <MuiPrimTextField
          onChange={onChange}
          value={value}
        />
        <MuiPrimButton onClick={onSubmit}>
          Send
        </MuiPrimButton>
      </Stack>
    </Stack>
  )
}

export default RightView