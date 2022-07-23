import React from 'react'
import styles from './style.module.css'

interface HeadInterface{
    children: React.ReactNode
}

const H5Hover: React.FC<HeadInterface> = ({
    children,
}) => {
  return (
    <h5 className={`${styles.textWrapper} ${styles.hover}`}>
        {children}
    </h5>
  )
}

export default H5Hover