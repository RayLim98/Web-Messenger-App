import { Stack } from '@mui/material'
import { TextField, Button, Typography, Box } from '@mui/material'
import { useAuth } from '../../../context/authProvider'
import MessageI from '../../../interface/MessageI'
import MuiPrimButton from '../../core/buttons-mui/muiPrimButton'
import MuiPrimTextField from '../../core/inputfields-mui/muiPrimTextField'
import MobileHeader from '../headers/mobileHeader'
import MessageList from './chat'

interface MobileChatViewProps {
  lobbyTitle: string
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
  lobbyTitle,
  userName,
  inputValue,
  messageList, 
  setInputValue, 
  submitMessage, 
}: MobileChatViewProps) => {
  return (
    <Box 
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
      alignItems={"stretch"}
      height={"100%"}
    >
      <MobileHeader lobbyTitle={lobbyTitle}/>
      <MessageList messageList={messageList} userName={userName}/>
      <Stack 
          direction={'row'} 
          justifyContent={"center"}
          sx={{
            mb: "1rem",
            pl: "2rem",
            pr: "2rem",
          }}
        >
        <MuiPrimTextField 
          onChange={(e)=> setInputValue(e.target.value)} 
          value={inputValue}
        />
        <MuiPrimButton onClick={submitMessage}>
          Send
        </MuiPrimButton>
      </Stack>
    </Box>
  )
}

export default MobileChatView
