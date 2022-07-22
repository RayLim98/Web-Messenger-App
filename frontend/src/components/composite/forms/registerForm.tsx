import styles from './form.module.css'
import { useForm } from 'react-hook-form'

const RegisterForm = ({ onSubmit}:{ onSubmit: (data:any)=> void} ) => {
  // form hook inputs
  const {register, handleSubmit, watch, formState: { errors } } = useForm();
  return (
    <form className = {styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={'test'} {...register("name", { required: true })}/>
      {errors.name && <span>This field is required</span>}
      <input defaultValue={'test'} {...register("password", { required: true })}/>
      {errors.password && <span>This field is required</span>}
      <input type = "submit"/>
    </form>
  )
}

export default RegisterForm