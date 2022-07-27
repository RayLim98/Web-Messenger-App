import {useState} from 'react'
import PageWrapper from '../components/core/wrapper/pageWrapper'
import LoginForm from '../components/composite/forms/loginForm'
import { H1, H6 } from '../components/core/text'

import '../App.css'

import loginUser from '../api/loginUser'
import TextButton from '../components/core/buttons/textButton'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [loading, setloading] = useState(false)
  const onSubmit = (data: any) => {
    loginUser(data)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  const pageState = 
  loading
  ? <div>loading</div>
  : <>
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
        {/* <TextButton onClick={()=> console.log("hello")} >
          Register
        </TextButton> */}
        <Link to="/register">
          <H6 hover>
            Register
          </H6>
        </Link>
      </div>
    </>

  return (
    <PageWrapper>
      {pageState}
    </PageWrapper>
  )
}

export default LoginPage
