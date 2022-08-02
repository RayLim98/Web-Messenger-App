import React from 'react'
import { TextProps } from './interface'
import styles from './style.module.css'

const H6: React.FC<TextProps> = ({
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
