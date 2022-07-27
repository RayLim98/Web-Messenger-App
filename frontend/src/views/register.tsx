import PageWrapper from '../components/core/wrapper/pageWrapper'
import LoginForm from '../components/composite/forms/loginForm'
import TextButton from '../components/core/buttons/textButton'
import '../App.css'
import { H1, H6 } from '../components/core/text'

import registerUser from '../api/registerUser'
import loginUser from '../api/loginUser'
import RegisterForm from '../components/composite/forms/registerForm'
import { useState } from 'react'
import { useAuth } from '../context/authProvider'

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const {register} = useAuth();

  const onSubmit = (data: any) => {
    setLoading(true);
    register(data);
    setLoading(false);
  }

  const pageState = 
  loading
  ? <div>loading</div>
  : <>
      <div style={{
        marginBottom: '20px',
      }}>
        <H1>
          Register
        </H1>
      </div>
      <RegisterForm onSubmit={onSubmit}/>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center' ,
      }}>
      </div>
    </>

  return (
    <PageWrapper>
      {pageState}
    </PageWrapper>
  )
}

export default RegisterPage

