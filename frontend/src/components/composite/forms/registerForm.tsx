import NumInput from '../../core/inputfields/numInput';
import PrimTextInput from '../../core/inputfields/primInput';
import styles from './form.module.css'
import { useForm } from 'react-hook-form'

interface FormProps {
  userName: string,
  password: string,
  passwordVerify: string
  age: number
}

const RegisterForm = ({ onSubmit }:{ onSubmit: (data:FormProps)=> void} ) => {
  // form hook inputs
  const {register, handleSubmit, watch, formState: { errors } } = useForm<FormProps>();
  return (
    <div className = {styles.formWrapper}>
      <form className = {styles.form} onSubmit={handleSubmit(onSubmit)}>
        <PrimTextInput
          placeholder='userName'
          register={register}
          required={true}
        />
        {errors.userName && <span>This field is required</span>}
        <PrimTextInput
          placeholder='password'
          register={register}
          required={true}
          password={true}
        />
        {errors.password && <span>This field is required</span>}
        <PrimTextInput
          placeholder='verifyPassword'
          register={register}
          required={true}
          password={true}
        />
        {errors.password && <span>This field is required</span>}
        <NumInput
          placeholder='age'
          register={register}
          required={true}
        />
        {errors.password && <span>This field is required</span>}
        <input type = "submit"/>
      </form>
    </div>
  )
}

export default RegisterForm