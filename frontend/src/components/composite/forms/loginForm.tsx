import styles from './form.module.css'
import { useForm } from 'react-hook-form'
import PrimTextInput from '../../core/inputfields/primInput'
import PrimButton from '../../core/buttons/primaryButton'

interface FormProps {
  userName: string
  password: string
}



const LoginForm = ({ onSubmit}:{ onSubmit: (data:FormProps)=> void} ) => {
  // form hook inputs
  const {register, handleSubmit, watch, formState: { errors } } = useForm<FormProps>()

  return (
    <div className = {styles.mainWrapper}>
      <form className = {styles.form} onSubmit={handleSubmit(onSubmit)}>
        <PrimTextInput
          keyValue='userName'
          placeholder='User Name'
          register={register}
          required={true}
        />
        {errors.userName && <span>This field is required</span>}
        <PrimTextInput
          keyValue='password'
          placeholder='Password'
          register={register}
          required={true}
          password
        />
        {errors.password && <span>password is missing</span>}
        <PrimButton type='submit'>
          Login
        </PrimButton>
      </form>
    </div>
  )
}

export default LoginForm
