import { Navigate, Outlet } from 'react-router-dom'

// Components
import { Container} from '@mui/material'

// Hooks
import { useAuth } from '../context/authProvider'
import { useComm } from '../context/commProvider'

// API
import MobileHeader from '../components/composite/headers/mobileHeader'


const Home = () => {
  const { user } = useAuth();
  const { currentLobby} = useComm();
  return (
    <Container 
      sx={{ 
        backgroundColor: "background.default",
        borderRadius: "25px",
      }}
    >
      <MobileHeader lobbyTitle={currentLobby.title} />
      <Outlet/>
      {!user && <Navigate to='/'/>}
    </Container>
  )
}

export default Home
