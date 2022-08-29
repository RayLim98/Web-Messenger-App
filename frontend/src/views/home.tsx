import { ChangeEvent, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { io } from 'socket.io-client'

// Components
import { Container, Stack, Typography,  Button, Box, TextField } from '@mui/material'
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

const socket = io("http://localhost:3001") ;

const Home = () => {
  const { user, setUser, getUserData } = useAuth();
  // lobby value 
  const [lobby, setLobby] = useState<string>("")

  // Get theme hook
  const { toggleMode } = useMode();

  // Clean up on logout
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  }
  
  const handleJoin = () => {
    socket.emit("join_room", lobby)
  } 
  // API call to get user message
  // const getMessage = async () => {
  //   try {
  //     const res = await getMessageApi(user.token);
  //     setState((prev) => ({...prev, list: res.data }))
  //     console.log(res.data)
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  // Update image and name fields 
  useEffect(()=> { 
    socket.on('message', (arg)=> {
      console.log("Message from server", arg)
    })
  }, [])

  return (
    <Container 
      sx={{ 
        backgroundColor: 'background.default',
        borderRadius: '25px',
        pt: '1rem',
      }}
    >
      {!user && <Navigate to='/'/>}
        <Stack>
          <Stack 
            width={'100%'} 
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              flexDirection: {
                sm: 'row' ,
              } 
            }}
          >
            <Typography sx={{mr: '1rem'}} variant={'h3'} color={'text.primary'}> Home Page </Typography>
            <UserBanner userImage={null}/>
          </Stack>
          {/* <AmzInputField value={value} setValue={setValue}/> */}
        </Stack>
        <Stack>
          <TextField 
            value = {lobby} 
            onChange={(e)=> setLobby(e.target.value)}
          />
          <Button onClick={handleJoin} disabled={lobby===""}>
            Join
          </Button>
        </Stack>
        <MessageBox socket={socket} lobbyId={lobby} userName={""}/>
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
    </Container>
  )
}

export default Home
