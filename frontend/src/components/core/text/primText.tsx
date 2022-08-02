import React from 'react'
import styles from './style.module.css'
import { TextProps } from './interface'

const PrimText: React.FC<TextProps> = ({children, hover}) => {
  return (
    <text className={`${styles.textWrapper} ${hover? styles.hover: null}`}>
        {children}
    </text>
  )
}

export default PrimText