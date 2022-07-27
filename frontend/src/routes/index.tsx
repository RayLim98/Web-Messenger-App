import {
    BrowserRouter as Router,
} from 'react-router-dom'
import { useAuth } from '../context/authProvider'
import LoggedIn from './loggedIn'
import NotLoggedIn from './notLogedIn'

const RouteHandler = () => {
    const { user } = useAuth()
    const accessRoute = user
    ? <LoggedIn/>
    : <NotLoggedIn/>

    return <Router>{accessRoute}</Router>
}

export default RouteHandler
