import React from 'react'
import { TextProps } from './interface'
import styles from './style.module.css'

const H5: React.FC<TextProps> = ({
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
