import PageWrapper from '../components/core/wrapper/pageWrapper'
import LoginForm from '../components/composite/forms/loginForm'
import TextButton from '../components/core/buttons/textButton'

import '../App.css'
import styles from './views.module.css'
import { useEffect, useState } from 'react'
import { H1, H5, H6 } from '../components/core/text'

import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authProvider'
import LandingBanner from '../components/composite/banner/landingBanner'
import {io} from 'socket.io-client'

const socket = io("http://localhost:3001") ;

const LoginPage = () => {
  const [loading, setloading] = useState(false)
  const { login } = useAuth()

  const onSubmit = async (data: any) => { 
    console.log(data)
    setloading(true);
    await login(data);
    setloading(false)
  }

  const pageState = loading
  ? <PageWrapper><div style={{width: '100%'}}>loading...</div></PageWrapper>
  : 
    <PageWrapper>
        <LandingBanner title={"User Project"}/>
        <div className={styles.formWrapper}>
          <LoginForm onSubmit={onSubmit}/>
          <div className={styles.registerWrapper}>
            <H6>Don't have an account?</H6>
            <TextButton>
              <Link to="/register">Register</Link>
            </TextButton>
          </div>
        </div>
    </PageWrapper>

  return ( pageState )
}

export default LoginPage
