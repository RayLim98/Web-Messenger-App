import React from 'react'
import styles from './style.module.css'
import { UseFormRegister } from 'react-hook-form'

interface Props {
    placeholder: string
    register: UseFormRegister<any>
    required?: boolean
    password?: boolean
}

const NumInput: React.FC<Props> = ({placeholder, register, required, password}) => {
  return (
    <input 
        className={styles.inputField}
        placeholder={placeholder}
        {...register(placeholder, { required: required || false })}
        type={"number"}
    />
  )
}

export default NumInput
