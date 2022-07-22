import React from 'react'
import styles from './style.module.css'

const BgWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={styles.mainWrapper}>{children}</div>
  )
}

export default BgWrapper
