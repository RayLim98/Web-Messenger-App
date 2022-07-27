import { useState } from 'react'
import PageWrapper from '../components/core/wrapper/pageWrapper'
import LoginForm from '../components/composite/forms/loginForm'
import { H1, H6 } from '../components/core/text'

import '../App.css'

import loginUser from '../api/loginUser'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/authProvider'

const LoginPage = () => {
  const [loading, setloading] = useState(false)
  const { user, login } = useAuth()

  const onSubmit = async (data: any) => { 
    setloading(true);
    await login(data);
    setloading(false)
  }

  const pageState = loading
  ? <PageWrapper><div style={{width: '100%'}}>loading...</div></PageWrapper>
  : 
    <PageWrapper>
      <div style={{
        marginBottom: '20px',
      }}>
        <H1>
          Login
        </H1>
      </div>
      <LoginForm onSubmit={onSubmit}/>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center' ,
      }}>
        <H6>Don't have an account?</H6>
        <Link to="/register">
          <H6 hover>
            Register
          </H6>
        </Link>
      </div>
    </PageWrapper>

  return (
    <>
      {
        user 
        ? <Navigate to = "/home" replace={true}/>
        : pageState
      }
    </>
  )
}

export default LoginPage
