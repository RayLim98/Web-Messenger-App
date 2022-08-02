import React from 'react'
import H5 from '../../text/h5'
import styles from './style.module.css' 

interface Props {
    children: React.ReactNode
    onClick?: () => void
}

const TextButton: React.FC<Props> = ({children, onClick}) => {
  return (
    <button 
      className={styles.buttonWrapper} 
      onClick={onClick} 
    >
      <H5 hover>
        {children}
      </H5>
    </button>
  )
}

export default TextButton