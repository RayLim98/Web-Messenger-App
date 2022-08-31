import {
    BrowserRouter as Router, Routes,
} from 'react-router-dom'
import { Route } from 'react-router-dom'
import LoginPage from '../views/login'
import RegisterPage from '../views/register'
import Home from '../views/home'
import Details from '../views/details'
import { useAuth } from '../context/authProvider'

const RouteHandler = () => {
    const {user} = useAuth()
    return (
        <Router> 
            <Routes>
                <Route path='/' element={<LoginPage/>}/> 
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/home' element={<Home/>}>
                    <Route path='details' element={<Details/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default RouteHandler
