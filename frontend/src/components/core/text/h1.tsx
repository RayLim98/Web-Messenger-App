import React from 'react'
import styles from './style.module.css'

interface Props{
    children: React.ReactNode
    hover?: boolean
}

const H1: React.FC<Props> = ({
    children,
    hover,
}) => {
  return (
    <h1 className={`${styles.textWrapper} ${hover? styles.hover: null}`}>
        {children}
    </h1>
  )
}

export default H1
