import React from 'react'
import { TextProps } from './interface'
import styles from './style.module.css'

const H4: React.FC<TextProps> = ({
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
