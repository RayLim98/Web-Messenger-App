import styles from './form.module.css'
import { useForm, UseFormRegister } from 'react-hook-form'
import PrimTextInput from '../../core/inputfields/primInput'
import NumInput from '../../core/inputfields/numInput'

interface FormProps {
  name: string
  password: string
}

const LoginForm = ({ onSubmit}:{ onSubmit: (data:FormProps)=> void} ) => {
  // form hook inputs
  const {register, handleSubmit, watch, formState: { errors } } = useForm<FormProps>()
  return (
    <div className = {styles.formWrapper}>
      <form className = {styles.form} onSubmit={handleSubmit(onSubmit)}>
        <PrimTextInput
          placeholder='name'
          register={register}
          required={true}
        />
        {errors.name && <span>This field is required</span>}
        <PrimTextInput
          placeholder='password'
          register={register}
          required={true}
          password
        />
        {errors.password && <span>This field is required</span>}
        <input type = "submit"/>
      </form>
    </div>
  )
}

export default LoginForm
