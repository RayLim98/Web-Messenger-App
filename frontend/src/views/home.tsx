import { Navigate } from 'react-router-dom'
import UserBanner from '../components/composite/banner/userBanner'
import MyDropzone from '../components/composite/imageDrop'
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
        <UserBanner/>
        <button onClick={handleLogout}>
          log out
        </button>
    </PageWrapper>
  )
}

export default Home
