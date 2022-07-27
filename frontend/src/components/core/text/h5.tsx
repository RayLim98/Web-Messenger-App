import React from 'react'
import styles from './style.module.css'

interface Props{
    children: React.ReactNode
    hover?: boolean
}

const H5: React.FC<Props> = ({
    children,
    hover,
}) => {
  return (
    <h5 className={`${styles.textWrapper} ${hover? styles.hover: null}`}>
        {children}
    </h5>
  )
}

export default H5
