import {
    BrowserRouter , Routes,
} from 'react-router-dom'
import { Route } from 'react-router-dom'
import LoginPage from '../views/login'
import RegisterPage from '../views/register'
import Home from '../views/home'
import Details from '../views/details'
import { useAuth } from '../context/authProvider'
import Lobby from '../views/lobby'

const RouteHandler = () => {
    const {user} = useAuth()
    return (
        <>
            <Routes>
                <Route path='/' element={<LoginPage/>}/> 
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/home' element={<Home/>}>
                    <Route path=':room' element={<Lobby/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default RouteHandler
