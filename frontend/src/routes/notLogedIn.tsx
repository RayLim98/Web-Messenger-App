import React from 'react'
import { Routes, Route} from 'react-router-dom'
import LoginPage from '../views/login'
import RegisterPage from '../views/register'

const NotLoggedIn = () => {
    return (
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
    )
}

export default NotLoggedIn