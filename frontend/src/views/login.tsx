import PageWrapper from '../components/core/wrapper/pageWrapper'
import LoginForm from '../components/composite/forms/loginForm'
import TextButton from '../components/core/buttons/textButton'
import '../App.css'

const LoginPage = () => {
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <PageWrapper>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit}/>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center' ,
      }}>
        <h6>
          Don't have an account?
        </h6>
        <TextButton onClick={()=> console.log('hello')}>
            Register
        </TextButton>
      </div>
    </PageWrapper>
  )
}

export default LoginPage
