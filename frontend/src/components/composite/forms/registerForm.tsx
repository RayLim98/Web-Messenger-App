import NumInput from '../../core/inputfields/numInput';
import PrimTextInput from '../../core/inputfields/primInput';
import styles from './form.module.css'
import { useForm } from 'react-hook-form'
import PrimButton from '../../core/buttons/primaryButton';
import PrimText from '../../core/text/primText';

interface FormProps {
  userName: string,
  password: string,
  passwordVerify: string
  age: number
}

interface Props  {
  onSubmit: (data:FormProps) => void
  isVerified?: boolean
}

const RegisterForm: React.FC<Props> = ({onSubmit, isVerified}) => {
  // form hook inputs
  const {register, handleSubmit, watch, formState: { errors } } = useForm<FormProps>();

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
          password={true}
        />
        {errors.password && <span>This field is required</span>}
        <PrimTextInput
          keyValue='passwordVerify'
          placeholder='Re-password'
          register={register}
          required={true}
          password={true}
        />
        {errors.passwordVerify && <span>This field is required</span>}
        <NumInput
          placeholder='age'
          register={register}
          required={true}
        />
        {errors.age && <span>This field is required</span>}
        <PrimButton type='submit'>
          Create Account
        </PrimButton>
        {!isVerified && <PrimText>Passwords not the same</PrimText>}
      </form>
    </div>
  )
}

export default RegisterForm
