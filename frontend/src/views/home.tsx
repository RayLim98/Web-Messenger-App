import { ChangeEvent, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

// Components
import { Container, Stack, Typography,  Button, Box, TextField, useMediaQuery, useTheme } from '@mui/material'
import UserBanner from '../components/composite/banner/userBanner'
import AmzInputField from '../components/core/inputfields/search-field'

// Hooks
import { useMode } from '../App'
import { useAuth } from '../context/authProvider'

// API
import createMessage from '../api/createMessage'
import getMessageApi from '../api/getMessages'
import MessageBox from '../components/composite/messageBox'
import TextButton from '../components/core/buttons/textButton'
import { useComm } from '../context/commProvider'
import { borderRadius } from '@mui/system'
import MobileHeader from '../components/composite/mobileHeader'


const Home = () => {
  const { user, setUser, getUserData, logout } = useAuth();
  const { sendMessage, setLobby, currentLobby, socket } = useComm();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Get theme hook
  const { toggleMode } = useMode();

  // Clean up on logout
  const handleLogout = () => logout()

  const handleJoin = () => {
    sendMessage();
   } 

  useEffect(()=> {
  }, [])

  return (
    <Container 
      sx={{ 
        backgroundColor: "background.default",
        borderRadius: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <MobileHeader open = {openDrawer} setOpen = {setOpenDrawer}/>
      <MessageBox 
        socket={socket}
        lobbyId={""}
        userName={""}
      /> 
      {/* <Stack direction ={"row"}>
        <Button onClick={handleLogout}>
          <Typography color={'text.secondary'}>
            Logout
          </Typography>
        </Button>
        <Button onClick={toggleMode}> 
          <Typography color={'text.secondary'}>
            Toggle 
          </Typography>
        </Button>
      </Stack> */}
      {!user && <Navigate to='/'/>}
    </Container>
  )
}

export default Home
