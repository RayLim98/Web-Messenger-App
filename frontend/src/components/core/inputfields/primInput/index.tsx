import React from 'react'
import styles from './style.module.css'
import { UseFormRegister } from 'react-hook-form'

interface Props {
    keyValue: string
    register: UseFormRegister<any>
    placeholder?: string
    required?: boolean
    password?: boolean
}

/**
 * @required
 * @param keyValue string
 * @param register UseFormRegister<any>
 */
const PrimTextInput: React.FC<Props> = ({keyValue, placeholder, register,required, password}) => {
  return (
    <input 
      className={styles.inputField}
      placeholder={placeholder}
      {...register(keyValue , { required: required || false, minLength: 8 })}
      type={password? "password": "text"}
    />
  )
}

export default PrimTextInput
