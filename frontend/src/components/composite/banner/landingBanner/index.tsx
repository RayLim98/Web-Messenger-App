import React from 'react'
import { H1 } from '../../../core/text'
import PrimText from '../../../core/text/primText'
import styles from './style.module.css'

interface Props {
    title: string
}

const LandingBanner: React.FC<Props> = ({title}) => {
  return (
    <div className={styles.mainWrapper}>
        <div className={styles.items}>
          <H1> {title} </H1>
        </div>
        <div className={styles.description}>
          <PrimText>
            Description here
          </PrimText>
        </div>
    </div>
  )
}

export default LandingBanner