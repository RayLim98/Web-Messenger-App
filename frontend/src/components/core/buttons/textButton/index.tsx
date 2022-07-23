import React from 'react'
import H5Hover from '../../text/h5Hover'
import styles from './style.module.css' 

interface Props {
    children: React.ReactNode
    onClick: () => void
}

const TextButton: React.FC<Props> = ({children, onClick}) => {
  return (
    <button 
      className={styles.buttonWrapper} 
      onClick={onClick} 
    >
      <H5Hover>
        {children}
      </H5Hover>
    </button>
  )
}

export default TextButton