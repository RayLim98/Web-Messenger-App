import { useState } from 'react'
import { useAuth } from '../context/authProvider'
import { Navigate } from 'react-router-dom'
import { Container, Stack, Typography,  Button, Box } from '@mui/material'
import { useMode } from '../App'
import UserBanner from '../components/composite/banner/userBanner'
import AmzInputField from '../components/core/inputfields/search-field'

const Home = () => {
  const { user, setUser } = useAuth();
  const [value, setValue] = useState<string | null>(null)
  const { toggleMode } = useMode();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  }

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
            <UserBanner/>
          </Stack>
          <AmzInputField value={value} setValue={setValue}/>
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
