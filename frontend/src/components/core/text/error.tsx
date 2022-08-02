import React from 'react'
import { TextProps } from './interface'
import styles from './style.module.css'

const ErrorText: React.FC<TextProps> = ({children}) => {
  return (
    <text className={styles.error}>
        {children}
    </text>
  )
}

export default ErrorText