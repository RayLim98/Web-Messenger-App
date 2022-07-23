import React from 'react'
import styles from './style.module.css'

interface HeadInterface{
    children: React.ReactNode
}

const H6: React.FC<HeadInterface> = ({
    children,
}) => {
  return (
    <h6 className={styles.textWrapper}>
        {children}
    </h6>
  )
}

export default H6