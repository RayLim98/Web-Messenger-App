import { Routes, Route } from 'react-router-dom'
import Home from '../views/home'
const LoggedIn = () => {
    return (
        <Routes>
            <Route path='/home' element={<Home/>}/>
        </Routes>
    )
}

export default LoggedIn