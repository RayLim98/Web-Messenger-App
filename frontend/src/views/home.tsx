import { useAuth } from '../context/authProvider'
import { Navigate } from 'react-router-dom'
import { Container, Stack, Typography,  Button, } from '@mui/material'
import { useMode } from '../App'
import UserBanner from '../components/composite/banner/userBanner'
import AmzInputField from '../components/core/inputfields/amzInput'

const Home = () => {
  const { user, setUser } = useAuth();
  const { toggleMode } = useMode();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  }

  return (
    <Container 
      fixed
      sx={{ 
        backgroundColor :"white", 
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
            <Typography sx={{mr: '1rem'}} variant={'h3'}> Home Page </Typography>
            <UserBanner/>
          </Stack>
          <AmzInputField/>
        </Stack>
        <Button onClick={handleLogout}> Log Out </Button>
        <Button onClick={toggleMode}> Toggle Display </Button>
    </Container>
  )
}

export default Home
