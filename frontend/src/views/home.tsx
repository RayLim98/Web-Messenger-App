import { Navigate } from 'react-router-dom'
import PageWrapper from '../components/core/wrapper/pageWrapper'
import { useAuth } from '../context/authProvider'

const Home = () => {
  const { user, setUser } = useAuth()

  const handleLogout = () => {
    localStorage.clear()
    setUser(null);
  }

  return (
    <PageWrapper>
        {!user && <Navigate to='/'/>}
        HomePage
        <button onClick={handleLogout}>
          log out
        </button>
    </PageWrapper>
  )
}

export default Home
