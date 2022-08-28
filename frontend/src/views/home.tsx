import { ChangeEvent, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

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

const Home = () => {
  const { user, setUser, getUserData } = useAuth();
  // Input field state
  const [value, setValue] = useState<string>("")
  // Message field states
  const [list, setList] = useState<any>(null)

  // Get theme hook
  const { toggleMode } = useMode();

  // Clean up on logout
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  }
  
  // Handle Text input change
  const handleMessage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(event.target.value)

  // Handle submit
  const handleSubmit = async () => {
    try {
      const res = await createMessage(value, user.token)
      console.log("Sent", res)
    } catch(err) {
      console.log("Failed", err)
    }
  }

  // API call to get user message
  const getMessage = async () => {
    try {
      const res = await getMessageApi(user.token);
      setList(res.data)
      console.log(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  // Update image and name fields 
  useEffect(()=> { 
    if(user) 
      getUserData()
      getMessage()
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
            {
              list && list.map((item:any, id:number) => ( 
                <div key={id}>
                  {item.message}
                </div> 
               ))
            }
        </Stack>
        <Stack direction={'row'}>
          <TextField 
            value={value}
            onChange={handleMessage}
          />
          <Button onClick={handleSubmit}>
              <Typography>
                Submit
              </Typography>
          </Button>
        </Stack>
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
