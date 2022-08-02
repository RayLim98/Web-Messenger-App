import React from 'react'
import styles from './style.module.css'
import { TextProps } from './interface'


const H1: React.FC<TextProps> = ({
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
