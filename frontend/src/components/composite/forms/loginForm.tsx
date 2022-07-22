import styles from './form.module.css'
import { useForm } from 'react-hook-form'

interface Inputs {
  name: string,
  password: string,
}

const LoginForm = ({ onSubmit}:{ onSubmit: (data:Inputs)=> void} ) => {
  // form hook inputs
  const {register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
  return (
    <div className = {styles.formWrapper}>
      <form className = {styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input 
          {...register("name", { required: true })}
          placeholder={"name"}
          type="text"
        />
        {errors.name && <span>This field is required</span>}
        <input 
          {...register("password", { required: true })}
          placeholder={"password"}
          type="password"
        />
        {errors.password && <span>This field is required</span>}
        <input type = "submit"/>
      </form>
    </div>
  )
}

export default LoginForm
