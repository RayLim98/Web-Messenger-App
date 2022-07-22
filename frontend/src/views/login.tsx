import PageWrapper from '../components/core/wrapper/pageWrapper'
import LoginForm from '../components/composite/forms/loginForm'

const LoginPage = () => {
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <PageWrapper>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit}/>
      <h5>Don't have an account? </h5>
      <h5>Register</h5>
    </PageWrapper>
  )
}

export default LoginPage