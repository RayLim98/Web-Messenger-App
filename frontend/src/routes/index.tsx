import {
    BrowserRouter as Router, Navigate, Routes,
} from 'react-router-dom'
import { useAuth } from '../context/authProvider'
import { Route } from 'react-router-dom'
import LoginPage from '../views/login'
import RegisterPage from '../views/register'
import Home from '../views/home'
import Details from '../views/details'

const RouteHandler = () => {
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
