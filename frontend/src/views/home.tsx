import { useAuth } from '../context/authProvider'
import { Navigate } from 'react-router-dom'
import UserBanner from '../components/composite/banner/userBanner'
import PageWrapper from '../components/core/wrapper/pageWrapper'

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
        <UserBanner/>
        <button onClick={handleLogout}>
          log out
        </button>
    </PageWrapper>
  )
}

export default Home
