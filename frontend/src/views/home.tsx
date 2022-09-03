import { Outlet, useNavigate } from 'react-router-dom'

// Components
import { Container} from '@mui/material'

// Hooks
import { useAuth } from '../context/authProvider'
import { useComm } from '../context/commProvider'

// API
import MobileHeader from '../components/composite/headers/mobileHeader'
import { useEffect } from 'react'


const Home = () => {
  const { user } = useAuth();
  const { currentLobby} = useComm();
  const navigate = useNavigate()

  useEffect(()=> {
    if(!user) navigate("/")
  }, [user])
  return (
    <Container 
      sx={{ 
        backgroundColor: "background.default",
        borderRadius: "25px",
      }}
    >
      <MobileHeader lobbyTitle={currentLobby.title} />
      <Outlet/>
    </Container>
  )
}

export default Home
