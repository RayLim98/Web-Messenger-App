import React from 'react'
import styles from './style.module.css'
import { ButtonProps } from '../interface'
import PrimText from '../../text/primText'

const PrimButton: React.FC<ButtonProps> = ({children, onClick, type}) => {
  return (
    <button 
      className={styles.buttonWrapper} 
      onClick={onClick} 
      type = {type || "button"}
    >
      <PrimText>
        {children}
      </PrimText>
    </button>
  )
}

export default PrimButton