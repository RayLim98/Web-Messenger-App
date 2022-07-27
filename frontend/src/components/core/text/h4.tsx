import React from 'react'
import styles from './style.module.css'

interface Props{
    children: React.ReactNode
    hover?: boolean
}

const H4: React.FC<Props> = ({
    children,
    hover,
}) => {
  return (
    <h4 className={`${styles.textWrapper} ${hover? styles.hover: null}`}>
        {children}
    </h4>
  )
}

export default H4
