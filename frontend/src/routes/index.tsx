import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import LoginPage from '../views/login'
import RegisterPage from '../views/register'
import Home from '../views/home'
import Settings from '../views/details'

const RouteHandler = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<LoginPage/>}/> 
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/home' element={<Home/>}>
                    <Route path='settings' element={<Settings/>}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default RouteHandler
