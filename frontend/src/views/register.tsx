import PageWrapper from '../components/core/wrapper/pageWrapper'
import RegisterForm from '../components/composite/forms/registerForm'

const Register = () => {
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <PageWrapper>
      <RegisterForm onSubmit={onSubmit}/>
    </PageWrapper>
  )
}

export default Register