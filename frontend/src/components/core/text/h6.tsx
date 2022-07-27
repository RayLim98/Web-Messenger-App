import React from 'react'
import styles from './style.module.css'

interface HeadInterface{
    children: React.ReactNode
    hover?: boolean
}

const H6: React.FC<HeadInterface> = ({
    children,
    hover,
}) => {
  return (
    <h6 className={`${styles.textWrapper} ${hover? styles.hover: null}`}>
        {children}
    </h6>
  )
}

export default H6
