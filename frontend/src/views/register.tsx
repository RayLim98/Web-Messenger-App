import PageWrapper from '../components/core/wrapper/pageWrapper'
import TextButton from '../components/core/buttons/textButton'
import '../App.css'
import { H6 } from '../components/core/text'
import styles from './views.module.css'

import RegisterForm from '../components/composite/forms/registerForm'
import { useState } from 'react'
import { useAuth } from '../context/authProvider'
import LandingBanner from '../components/composite/banner/landingBanner'

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [isVerify, setIsVerify] = useState(true);
  const {register} = useAuth();


  const onSubmit = async (data: any) => {
    console.log(data);
    if(data.password == data.passwordVerify) {
      setIsVerify(true);
      setLoading(true);
      await register(data);
      setLoading(false);
    } else {
      setIsVerify(false);
    }
  }

  const pageState = loading
  ? <div>loading</div>
  : <>
      <LandingBanner title='User Project'/>
      <div className={styles.formWrapper}>
        <RegisterForm onSubmit={onSubmit} isVerified={isVerify}/>
      </div>
    </>

  return (
    <PageWrapper>
      {pageState}
    </PageWrapper>
  )
}

export default RegisterPage

